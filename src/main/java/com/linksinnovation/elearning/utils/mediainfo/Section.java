package com.linksinnovation.elearning.utils.mediainfo;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @author Jirawong Wongdokpuang <jirawong@linksinnovation.com>
 */
public class Section {
  public static Section parse(final String line) throws IllegalArgumentException {
    if (line.contains(":")) {
      throw new IllegalArgumentException("Section name should not have ':'");
    }

    return new Section(line.trim());
  }

  private final String name;

  private final Map<String, NameValue> values = new LinkedHashMap<>();

  private Section(final String name) {
    this.name = Objects.requireNonNull(name);
  }

  public void add(final NameValue nameValue) throws IllegalArgumentException {
    final String name = nameValue.getName();
    if (values.containsKey(name)) {
      return;
    }

    values.put(name, nameValue);
  }

  public String get(final String valueName) {
    final NameValue nameValue = values.get(valueName);
    if (nameValue == null) {
      return null;
    }

    return nameValue.getValue();
  }

  public String getName() {
    return name;
  }

  @Override
  public String toString() {
    final StringBuilder formatted = new StringBuilder();
    formatted.append(name).append("\n");
    if (values.isEmpty()) {
      formatted.append("  No values!!!\n");
    } else {
      for (final NameValue nameValue : values.values()) {
        formatted.append("  ").append(nameValue).append("\n");
      }
    }
    return formatted.toString();
  }
}