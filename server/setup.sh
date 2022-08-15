#!/bin/sh

pip3 install -r requirements.txt

# spaCy
python -m spacy download en

# nltk
python -m nltk.downloader words
python -m nltk.downloader stopwords
