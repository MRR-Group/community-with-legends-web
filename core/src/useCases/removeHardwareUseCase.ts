import HardwareRepository from "../repositories/hardwareRepository.ts";

export class RemoveHardwareUseCase {
  private _hardwareRepository: HardwareRepository;

  constructor(hardwareRepository: HardwareRepository) {
    this._hardwareRepository = hardwareRepository;
  }

  public async removeHardware(hardwareId: number): Promise<void> {
    return this._hardwareRepository.removeHardware(hardwareId);
  }
}