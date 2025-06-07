import HardwareRepository from "../repositories/hardwareRepository.ts";

export class EditHardwareUseCase {
  private _hardwareRepository: HardwareRepository;

  constructor(hardwareRepository: HardwareRepository) {
    this._hardwareRepository = hardwareRepository;
  }

  public async editHardware(hardwareId: number, title: string, value: string): Promise<void> {
    return this._hardwareRepository.editHardware(hardwareId, title, value);
  }
}