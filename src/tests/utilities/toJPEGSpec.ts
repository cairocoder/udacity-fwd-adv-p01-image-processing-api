import path from 'path';
import resizeJPEG from '../../utilities/JPEG';

describe('Test image processing', () => {
  it('should return the resized version of the image with specific width and height', async () => {
    const srcFilePath = path.join(
      __dirname + '../../../../images/full/fjord.jpg'
    );
    const dstFileName = 'fjord' + 250 + 250 + '.jpg';
    const dstDir = path.join(__dirname + '../../../../images/thumb/');
    const dstFilePath = dstDir + dstFileName;
    await resizeJPEG(srcFilePath, 250, 250, dstFilePath);

    expect(dstFilePath).toBeTruthy();
  });
});
