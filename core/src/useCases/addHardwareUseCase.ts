import HardwareRepository from "../repositories/hardwareRepository.ts";
import Hardware from "../entities/hardware.ts";

export class AddHardwareUseCase {
  private _hardwareRepository: HardwareRepository;

  constructor(hardwareRepository: HardwareRepository) {
    this._hardwareRepository = hardwareRepository;
  }

  public async addHardware(title: string, value: string): Promise<Hardware> {
    return this._hardwareRepository.addHardware(title, value);
  }
}