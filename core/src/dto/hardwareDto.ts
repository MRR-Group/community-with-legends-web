import Hardware from "../entities/hardware.ts";

export default interface HardwareDto {
  id: number,
  title: string,
  value: string,
}

export function hardwareDtoToEntity(data: HardwareDto):Hardware {
  return new Hardware(data.id, data.title, data.value);
}