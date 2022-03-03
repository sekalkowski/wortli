from __future__ import print_function

import json
import numpy as np

fname = 'curated.json';

def load():
    with open(fname, 'rb') as f:
        return json.loads(f.read().decode('utf-8'))

def save(data):
    with open(fname, 'wb') as f:
        f.write(json.dumps(data, indent=1).encode('utf-8'))


def merge(L, R):
    """ Roughly:
        - Base forms of nouns, verbs ad adjectives before plurals before other derivatives (short forms, conjunctive, genitive, etc.)
        - "feels ab bit more common" before feels a bit less common"
        - german before adopted foreign words
        - I have no idea what this word even means last
    """
    block_merge_thresh = 4
    if len(L) > block_merge_thresh and len(R) > block_merge_thresh:
        # try to skip zip merge by just concatenating the full lists
        l, r = L[-1], R[0]
        print(u'Which is better suited as solution word? 1: {}\t2: {}\t*: neither '.format(l, r), end='')
        res = input()
        if res == '1':
            return L + R
        
        l, r = L[0], R[-1]
        print(u'Which is better suited as solution word? 1: {}\t2: {}\t*: neither '.format(l, r), end='')
        res = input()
        if res == '2':
            return R + L

    return full_merge(L, R)


def full_merge(L, R):
    J = []
    while len(L) and len(R):
        l, r = L.pop(0), R.pop(0)
        print(u'Which is better suited as solution word? 1: {}\t2: {} '.format(l, r), end='')
        """Roughly:
            - Base forms of nouns, verbs ad adjectives before plurals before other derivatives (short forms, conjunctive, genitive, etc.)
            - "feels ab bit more common" before feels a bit less common"
            - german before adopted foreign words
            - I have no idea what this word even means last
        """
        res = input()
        if res == '1':
            J.append(l)
            R.insert(0, r)
        elif res == '2':
            L.insert(0, l) 
            J.append(r)
        else:
            L.insert(0, l)
            R.insert(0, r)
    J.extend(L)
    J.extend(R)
    return J


def main():
    data = load()

    while(len(data) > 0):
        indices = list(range(len(data)))
        weights = np.array([1./(len(e)**2) for e in data])
        i, k = np.random.choice(indices, 2, p=weights/np.sum(weights), replace=False)
        if i == k: continue
        if i > k:
            i, k = k, i
        R = data.pop(k)
        L = data.pop(i)
        print("Comparing %d vs %d (%d, %d, left: %d)" % (i, k, len(L), len(R), len(data)))
        J = full_merge(L[:], R[:])
        data.insert(0, J)

        save(data)


if __name__ == '__main__':
    main()