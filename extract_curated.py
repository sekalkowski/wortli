import random
import json

from classify import load

def main():

    """
    Heuristically creates a total ordering of words (more suitable solution words first) from the (potentially)
    partial ordering as given in `curated.json`. Exports it to `wordlist.js`
    """

    data = load()

    total = []

    while len(data):
        data.sort(key=len, reverse=True)
        total.append(data[0].pop(0))
        data = [l for l in data if len(l)]
    
    with open('wordlist.js', 'w') as f:
        f.write(
            "// https://sites.google.com/site/joergtinner/ -> Scrabble Word List, German\n"
            "export const wordlist = JSON.parse('%s');" % json.dumps(total))


if __name__ == '__main__':
    main()
