# Tolerance API

## Introduction
ISO 286-2 Tolerances is a large set of data for different sizes of holes and shafts. Since no machining can be done without any inaccuracies, tolerances are essential for specifying the range of the acceptable mistake. These tolerances consist of a nominal size range, a tolerance character and a grade. The right combination of these parameters describes a certain acceptable size range for the given nominal size.

## Requierements

### Getting all the characters for a specific size:

- **Function:** `GetCharacters()`
- **Required input:** size
- **Returns:** characters

### Getting all the grades for a specific size and character:

- **Function:** `GetGrades()`
- **Requiered input:** size, character
- **Returns:** grades

### Getting the upper and lower limits for a specific size, character and tolerance value:

- **Function:** `GetRange()`
- **Requiered input:** size, character, grade
- **Returns:** upper and lower limit

