///
/// Unistyles-Swift-Cxx-Bridge.hpp
/// Sat Aug 17 2024
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/react-native-nitro
/// Copyright © 2024 Marc Rousavy @ Margelo
///

#pragma once

// Forward declarations of C++ defined types


// Include C++ defined types
#include <optional>
#include <string>

/**
 * Contains specialized versions of C++ templated types so they can be accessed from Swift,
 * as well as helper functions to interact with those C++ types from Swift.
 */
namespace margelo::nitro::unistyles::bridge::swift {

  /**
   * Specialized version of `std::optional<std::string>`.
   */
  using std__optional_std__string_ = std::optional<std::string>;
  inline std::optional<std::string> create_std__optional_std__string_(const std::string& value) {
    return std::optional<std::string>(value);
  }
  
  /**
   * Specialized version of `std::optional<double>`.
   */
  using std__optional_double_ = std::optional<double>;
  inline std::optional<double> create_std__optional_double_(const double& value) {
    return std::optional<double>(value);
  }

} // namespace margelo::nitro::unistyles::bridge::swift