#!/bin/bash
git remote remove origin 2>/dev/null
git remote add origin "https://github.com"
git push -u origin main --force
