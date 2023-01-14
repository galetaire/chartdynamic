**Parent repo: [/spahousing](https://github.com/galetaire/spahousing)**

## Description

Dynamic charts created with https://www.chartjs.org/. The data has been hard-coded, meaning that is integrated in it's respective ``.js`` file, along with the functional code. Therefor, there is no unique database from which the data is called. However, it is possible to use a ``.csv`` file. A good example for future reference is the following by [Peter Cook](https://twitter.com/peter_r_cook):
* https://www.createwithdata.com/chartjs-and-csv/

## Duplicated data files

Some files are duplicated, such as ``cost.js`` cand ``cost2.js``. They are the same data implementation but with different structures. Due to the fact that ``chart.js`` have different versions (2.0, 3.0 and 4.0), with some features not backwards compatible, so I have been testing versions and expressions.

## Website access

The site: http://chart.galetaire/, is a Handshake domain, note that for resolving the handshake DNS you will need a resolver since most browsers today do not support it, consider using Fingertip:
* https://github.com/imperviousinc/fingertip
