package com.linksinnovation.elearning.utils.mediainfo;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class MediaInfo {

  public static MediaInfo parse(final String data) throws IllegalArgumentException {

    final MediaInfo mediaInfo = new MediaInfo(data);

    Section section = null;

    for (final String line : data.split("(\\r\\n|\\r|\\n)")) {
      if (line.isEmpty()) {
        section = null;
        continue;
      }

      if (section == null) {
        section = mediaInfo.addSection(Section.parse(line));
        continue;
      }

      section.add(NameValue.parse(line));
    }

    return mediaInfo;
  }

  private final String rawData;
  private final Map<String, Section> sections = new LinkedHashMap<>();

  private MediaInfo(final String rawData) {
    this.rawData = Objects.requireNonNull(rawData);
  }

  private Section addSection(final Section section) throws IllegalArgumentException {
    final String name = section.getName();
    if (sections.containsKey(name)) {
      throw new IllegalArgumentException("Duplicate section name: '" + name + "'");
    }

    sections.put(name, section);
    return section;
  }

  public String get(final String sectionName, final String valueName) {
    final Section section = sections.get(sectionName);
    if (section == null) {
      return null;
    }
    return section.get(valueName);
  }

  public String getRawData() {
    return rawData;
  }

  @Override
  public String toString() {
    final StringBuilder formatted = new StringBuilder();
    if (sections.isEmpty()) {
      formatted.append("No information found!!!");
    } else {
      for (final Section section : sections.values()) {
        formatted.append(section);
      }
    }

    return formatted.toString();
  }
}