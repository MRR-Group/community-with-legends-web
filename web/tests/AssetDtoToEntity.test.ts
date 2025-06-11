import { describe, it, expect } from 'vitest';
import { assetDtoToEntity } from '../../core/src/dto/assetDto';
import ImageAsset from '../../core/src/entities/imageAsset';
import VideoAsset from '../../core/src/entities/videoAsset';
import UnsupportedAssetTypeException from '../../core/src/exceptions/unsupportedAssetTypeException';

describe('assetDtoToEntity', () => {
  it('should return ImageAsset instance for type "Image"', () => {
    const dto = { id: 1, link: 'http://image.link', type: 'Image' } as const;

    const entity = assetDtoToEntity(dto);

    expect(entity).toBeInstanceOf(ImageAsset);
    expect(entity.id).toBe(dto.id);
    expect(entity.link).toBe(dto.link);
    expect(entity.type).toBe('Image');
  });

  it('should return VideoAsset instance for type "Video"', () => {
    const dto = { id: 2, link: 'http://video.link', type: 'Video' } as const;

    const entity = assetDtoToEntity(dto);

    expect(entity).toBeInstanceOf(VideoAsset);
    expect(entity.id).toBe(dto.id);
    expect(entity.link).toBe(dto.link);
    expect(entity.type).toBe('Video');
  });

  it('should throw UnsupportedAssetTypeException for unknown type', () => {
    const dto = { id: 3, link: 'http://unknown.link', type: 'Audio' } as any;

    expect(() => assetDtoToEntity(dto)).toThrowError(UnsupportedAssetTypeException);
  });
});
