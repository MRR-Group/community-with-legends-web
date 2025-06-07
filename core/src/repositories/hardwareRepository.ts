import axios from "axios";
import Response from "../dto/response.ts";
import Hardware from "../entities/hardware.ts";
import HardwareDto, {hardwareDtoToEntity} from "../dto/hardwareDto.ts";

export default class HardwareRepository {
  public async byId(hardwareId: number):Promise<Hardware> {
    const response = await axios.get<Response<HardwareDto>>(`/api/hardware/${hardwareId}`);
    const hardware = response.data.data;

    return hardwareDtoToEntity(hardware);
  }

  public async byUser(userId: number):Promise<Hardware[]> {
    const response = await axios.get<Response<HardwareDto[]>>(`/api/users/${userId}/hardware`);
    const hardwareList = response.data.data.map((hardware) => hardwareDtoToEntity(hardware));

    return hardwareList;
  }

  public async addHardware(title: string, value: string): Promise<Hardware> {
    const response = await axios.post(`/api/user/hardware`, {title, value});
    const content = await this.byId(response.data.id);

    return content;
  }

  public async editHardware(hardwareId: number, title: string, value: string): Promise<void> {
    await axios.post(`/api/user/hardware/${hardwareId}`, {title, value});
  }

  public async removeHardware(hardwareId: number): Promise<void> {
    await axios.delete(`/api/user/hardware/${hardwareId}`);
  }
}