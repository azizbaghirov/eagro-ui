import axios from "axios";
import { useEffect, useState } from "react";

export const Legend: React.FC = () => {
  const [legend, setLegend] = useState<any>();

  const getLegend = (): Promise<any> => {
    return axios({
      method: "GET",
      url: `${process.env.REACT_APP_MAP_SERVER}/legend?f=json`,
    });
  };

  useEffect(() => {
    getLegend().then((response) => {
      let legend = response.data;
      setLegend(legend);
    });
  }, []);

  return (
    <ul className="legend">
      {legend?.layers?.length > 0 &&
        legend.layers
          .filter((layer: any) => layer.layerName === "Faktiki istifadə")
          .map((filteredLayer: any) => (
            filteredLayer.legend.map((l: any) => (
              <div className="flex gap-1">
                <img
                  width={l.width}
                  height={l.height}
                  src={`data:${l.contentType};base64,${l.imageData}`}
                  alt={`legend-${l.label}`}
                />
                <span>{l.label}</span>
              </div>
            ))
          ))}
    </ul>
  );
};

export default Legend;
