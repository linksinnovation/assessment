package com.linksinnovation.elearning.utils.mediainfo;

import java.util.Objects;

/**
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class NameValue {

  public static NameValue parse(final String line) throws IllegalArgumentException {
    if (!line.contains(" : ")) {
      throw new IllegalArgumentException("The line is expected to have a ' : '");
    }

    final String[] parts = line.split(" : ", 2);
    return new NameValue(parts[0].trim(), parts[1].trim());
  }

  private final String name;
  private final String value;

  private NameValue(final String name, final String value) {
    this.name = Objects.requireNonNull(name);
    this.value = Objects.requireNonNull(value);
  }

  public String getName() {
    return name;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.format("[%s] = '%s'", name, value);
  }

}