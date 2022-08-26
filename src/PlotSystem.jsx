//This system is to be kept indentical to the Tychos system object
//and is used to calculate/plaot planetary positions
import { PlotObj } from "./PlotObj";
export function PlotSystem() {
  return (
    <group>
      <PlotObj name="Barycenter">
        <PlotObj name="Earth">
          <PlotObj name="MoonDefA">
            <PlotObj name="MoonDefB">
              <PlotObj name="Moon" />
            </PlotObj>
          </PlotObj>
          <PlotObj name="SunDefA">
            <PlotObj name="Sun">
              <PlotObj name="JupiterDef">
                <PlotObj name="Jupiter" />
              </PlotObj>
              <PlotObj name="SaturnDef">
                <PlotObj name="Saturn" />
              </PlotObj>
            </PlotObj>
          </PlotObj>
          <PlotObj name="VenusDefA">
            <PlotObj name="VenusDefB">
              <PlotObj name="Venus" />
            </PlotObj>
          </PlotObj>
          <PlotObj name="MercuryDefA">
            <PlotObj name="MercuryDefB">
              <PlotObj name="Mercury" />
            </PlotObj>
          </PlotObj>
          <PlotObj name="MarsDefE">
            <PlotObj name="MarsDefS">
              <PlotObj name="Mars" />
            </PlotObj>
          </PlotObj>
        </PlotObj>
      </PlotObj>
    </group>
  );
}
