import ElementalStatus from "@/ElementalStatuses/ElementalStatus";
import {VisionType} from "@/VisionType";

export default class GeoStatus extends ElementalStatus {
  public visionType: VisionType = VisionType.Geo;
}
