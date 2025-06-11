import { describe, it, expect } from 'vitest';
import Hardware from '../../core/src/entities/hardware';
import HardwareDto, { hardwareDtoToEntity } from '../../core/src/dto/hardwareDto';

describe('hardwareDtoToEntity', () => {
  it('should correctly map HardwareDto to Hardware entity', () => {
    const dto: HardwareDto = {
      id: 7,
      title: 'GPU',
      value: 'NVIDIA RTX 3080',
    };

    const hardware = hardwareDtoToEntity(dto);

    expect(hardware).toBeInstanceOf(Hardware);
    expect(hardware.id).toBe(dto.id);
    expect(hardware.title).toBe(dto.title);
    expect(hardware.value).toBe(dto.value);
  });
});
