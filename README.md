# Fuzzy Name Conversion of Hindi Names in Police Records

## Project Overview

The **Fuzzy Name Conversion of Hindi Names in Police Records** project addresses the problem of **inconsistent spelling and representation of Hindi names** in police and government databases. Due to variations in transliteration (Hindi ↔ English), the same person’s name may appear in multiple forms, leading to duplication, mismatches, and difficulties in record verification.

This system uses **fuzzy string matching and phonetic similarity techniques** to intelligently identify and match Hindi names that are spelled differently but sound or mean the same.

---

# Objectives

* Handle spelling variations of Hindi names in police records
* Improve accuracy in record matching and retrieval
* Reduce duplication and false mismatches in databases
* Assist police and administrative authorities in faster verification

---

## Problem Statement

Police records often contain names written in English that originate from Hindi. Due to:

* Multiple transliteration styles
* Human data-entry errors
* Regional pronunciation differences

The same name may exist in different forms (e.g., *Ramesh*, *Ramish*, *Ramesh Kumar*). Traditional exact-match systems fail to identify such cases.

This project solves this issue using **fuzzy matching algorithms** instead of strict string comparison.

---

## Key Features

* Fuzzy matching of Hindi-origin names
* Phonetic similarity handling
* Tolerance to spelling mistakes
* Efficient comparison across large record sets
* Modular and scalable design

---

## Technologies Used

* **Programming Language:** Python
* **Libraries & Techniques:**

  * FuzzyWuzzy / RapidFuzz
  * Levenshtein Distance
  * Soundex / Metaphone (optional)
  * Pandas for data handling
* **Database (Optional):** CSV / SQLite / MySQL
* **Tools:** Git, GitHub

---

## System Workflow

1. Input police records containing names
2. Preprocess names (lowercasing, trimming, normalization)
3. Generate phonetic representations
4. Apply fuzzy matching algorithms
5. Calculate similarity scores
6. Identify probable name matches
7. Output matched or standardized names

---

## Matching Techniques Used

* Levenshtein Distance
* Token Sort / Token Set Ratio
* Phonetic Encoding
* Threshold-based similarity scoring

---

## How to Run the Project

1. Clone the repository

```bash
git clone https://github.com/your-username/Fuzzy-Name-Conversion-of-Hindi-Names-in-Police-Record.git
```

2. Navigate to the project directory

```bash
cd Fuzzy-Name-Conversion-of-Hindi-Names-in-Police-Record
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Run the project

```bash
python main.py
```

## Results and Benefits

* Improved name-matching accuracy
* Faster record verification
* Reduced manual checking effort
* Enhanced reliability of police databases

---

## Future Enhancements

* Support for direct Hindi (Devanagari) input
* Use of ML/Deep Learning-based name embeddings
* Integration with live police databases
* Web-based interface for officials
* Multi-language name support

---

## Academic Relevance

This project is suitable for:

* MCA / B.Tech final-year projects
* Software Engineering and AI coursework
* Government database optimization studies

---

## License

This project is intended for academic and educational purposes.

