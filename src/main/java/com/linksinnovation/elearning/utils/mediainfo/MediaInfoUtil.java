
package com.linksinnovation.elearning.utils.mediainfo;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

/**
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */

public class MediaInfoUtil {

  public static String executeMediaInfo(final String mediaPath) throws IOException, InterruptedException {
    final String exePath = MediaInfoUtil.getMediaInfoCliPath();
    final ProcessBuilder builder = new ProcessBuilder(exePath,"-f", mediaPath);
    builder.redirectErrorStream(true);
    final Process process = builder.start();

    final StringBuilder buffer = new StringBuilder();
    try (Reader reader = new InputStreamReader(process.getInputStream())) {
      for (int i; (i = reader.read()) != -1;) {
        buffer.append((char) i);
      }
    }

    final int status = process.waitFor();
    if (status == 0) {
      return buffer.toString();
    }

    throw new IOException("Unexpected exit status " + status);
  }

  public static MediaInfo getMediaInfo(final String mediaPath) throws IOException, InterruptedException {
    return MediaInfo.parse(MediaInfoUtil.executeMediaInfo(mediaPath));
  }

  private static String getMediaInfoCliPath() throws IOException {
    return MediaInfoUtil.MEDIA_INFO_CLI_PATH;
  }

  private static final String MEDIA_INFO_CLI_PATH = "/usr/bin/mediainfo";

  private MediaInfoUtil() {}

}
