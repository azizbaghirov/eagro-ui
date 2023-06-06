import * as React from "react";
import * as EL from "esri-leaflet";
import * as L from "leaflet";
import {
  MapContainer,
  LayersControl,
  ScaleControl,
  ZoomControl,
  TileLayer,
  Marker,
  LayerGroup,
  useMapEvents,
} from "react-leaflet";
import { TiledMapLayer, DynamicMapLayer } from "react-esri-leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import Legend from "./Legend";
import { SideBarContainer } from "./SideBarContainer";
import { FieldsLabel } from "utils/enums";
import { IOrganizationInfo } from "interfaces/IMap";
import { roundDecimalNumber } from "utils/helpers";
import { FILTER_VALUES, ORGS_LIST } from "utils/constants";

export const MapLayout: React.FC = () => {
  const dynamicLayerRef = useRef<EL.DynamicMapLayer>(null);
  const layersControlRef = useRef<L.Control.Layers>(null);
  const mapLayoutRef = useRef<L.Map>(null);

  const [foundedArea, setFoundedArea] = useState<number>(0);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [filterLayer, setFilterLayer] = useState<any>(null);
  const [markersArr, setMarkersArr] = useState<any[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const searchQuery = (q: string) => {
    filterLayer && mapLayoutRef.current?.removeLayer(filterLayer);
    EL.query({ url: `${process.env.REACT_APP_MAP_SERVER}/3` })
      .where(q)
      .run((error, featureCollection, response) => {
        const area: number = countFoundedArea(featureCollection.features);
        setFoundedArea(area);
        if (area > 0) {
          addFilterLayer(featureCollection);
        } else {
          resetMap();
        }
      });
  };

  var pointIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon-2x.png",
    iconSize: [18, 18],
  });

  const addFilterLayer = (featureCollection: any) => {
    let newFilterLayer: L.GeoJSON;
    newFilterLayer = L.geoJSON(featureCollection, {
      pointToLayer(geoJsonPoint, latlng) {
        return L.marker(latlng, { icon: pointIcon });
      },
      style: () => ({
        weight: 4,
        opacity: 0.8,
        color: "#80ffff",
        dashArray: "2",
        fillOpacity: 0.3,
      }),
      onEachFeature(feature, layer) {
        layer.on({
          click: (e) => {
            const clickedFeature = e.target;
            mapLayoutRef.current?.fitBounds(clickedFeature.getBounds());
            const clickedFeatureInfo = clickedFeature.feature.properties;
            const featureObj: IOrganizationInfo =
              createFeatureObject(clickedFeatureInfo);
            setSelectedFeature(featureObj);
          },
        });
      },
    });
    newFilterLayer.addTo(mapLayoutRef.current!);
    mapLayoutRef.current?.fitBounds(newFilterLayer.getBounds());
    mapLayoutRef.current?.setMaxZoom(30);
    setFilterLayer(newFilterLayer);
  };

  const createFeatureObject = (feature: any): IOrganizationInfo => {
    let organizations: string[] = [];
    Object.keys(feature).forEach((key: string) => {
      if (key.includes(FieldsLabel.organization)) {
        if (feature[key]) organizations.push(feature[key]);
      }
    });
    let featureObj: IOrganizationInfo = {
      organizations: organizations,
      factArea: roundDecimalNumber(feature.Fact_area),
      factUse: feature.Fact_use,
      district: feature.Rayon,
    };
    return featureObj;
  };

  const countFoundedArea = (features: any[]): number => {
    let sumArea: number = 0;
    features.forEach((f) => {
      sumArea += f.properties["Fact_area"];
    });
    return roundDecimalNumber(sumArea);
  };

  const resetMap = () => {
    mapLayoutRef.current?.setView([40.505264, 49.858092], 8);
    if (filterLayer) {
      mapLayoutRef.current?.removeLayer(filterLayer);
      setFilterLayer(null);
    }
    setFoundedArea(0);
    setSelectedFeature(null);
    setSelectedPosition([0, 0]);
  };

  const addMarkers = () => {
    EL.query({ url: `${process.env.REACT_APP_MAP_SERVER}/0` }).run(
      (error, featureCollection, response) => {
        const { features } = response;
        setMarkersArr(features);
      }
    );
  };

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon-2x.png",
    iconSize: [18.29, 30],
  });

  useEffect(() => {
    addMarkers();
    return () => {
      localStorage.removeItem(FILTER_VALUES);
      localStorage.removeItem(ORGS_LIST);
    };
  }, []);

  const SelectedMarker = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);
      },
    });
    return (
      selectedPosition && (
        <Marker
          key={selectedPosition[0]}
          position={selectedPosition}
          icon={customIcon}
        />
      )
    );
  };

  return (
    <>
      <SideBarContainer
        selectedFeature={selectedFeature}
        searchQuery={(q: string) => searchQuery(q)}
        resetMap={resetMap}
        area={foundedArea}
        filterLayer={filterLayer}
      />
      <Legend />
      <MapContainer
        center={[40.505264, 49.858092]}
        zoom={8}
        zoomControl={false}
        bounds={[
          [42.423, 41.835],
          [38.285, 51.21],
        ]}
        maxBounds={[
          [42.423, 41.835],
          [38.285, 51.21],
        ]}
        style={{ height: "100vh" }}
        ref={mapLayoutRef}
      >
        <LayersControl position="topright" ref={layersControlRef}>
          <ScaleControl />
          <ZoomControl position="bottomright" />
          <LayersControl.Overlay name="Tiled map" checked>
            <TiledMapLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
              attribution="DNS"
              maxZoom={17}
              minZoom={8}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Open street map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={17}
              minZoom={8}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Dynamic" checked>
            <DynamicMapLayer
              url="https://10.10.10.199:6443/arcgis/rest/services/EKTIS/KTN_Servis_2023/MapServer"
              opacity={0.9}
              ref={dynamicLayerRef}
            />
          </LayersControl.Overlay>
        </LayersControl>
        {!filterLayer && (
          <LayerGroup>
            {markersArr?.length &&
              markersArr.map((marker: any) => {
                const { x, y } = marker.geometry;
                return <Marker position={[y, x]} icon={customIcon} />;
              })}
          </LayerGroup>
        )}
        <SelectedMarker />
      </MapContainer>
    </>
  );
};

export default MapLayout;
