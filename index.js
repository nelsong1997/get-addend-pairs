//input array of ints
let input = [-3, 13]

function getAddendPairs(sumTo, numsArr, questionNum) {
    //sumTo is the number that the addend pairs should sum up to (should always be 10 for this exercise)
    //numsArr is an array of integers
    //    we will assume that each value of numsArr is an integer
    //    (we will not check to verify this)
    //questionNum will affect how the function performs
    //    depending on question num 1, 2, or 3

    //create empty array which will store our pairs (our answer)
    //    each pair will be an array with two values
    let pairs = []

    //create empty object which will store a count of how many times a given num appears.
    //    when we 'use' a num (pair it with a complement), we will set its value to 0 to signify that it has been used
    //    but only for questions 2 and 3. For question 1, we want duplicates, so we won't do this.
    //    we're using this obj to avoid having to loop through the entire arr for each num.
    let numCounter = {}

    for (let i=0; i<numsArr.length; i++) {
        let num = numsArr[i]

        //num + complement = sumTo
        let complement = sumTo - num

        //number of complements--could be a pos int, undefined, or 0
        //    undefined => it hasn't been found yet
        //    0 => we previously found it but we don't want a duplicate
        let numOfComps = numCounter[complement]

        //if we can find num's complement
        if (numOfComps) {
            switch (questionNum) {
                case 1:
                    //we want to add two pairs for every complement
                    for (let j=0; j<numOfComps; j++) {
                        //we add a pair and its reverse
                        pairs.push([complement, num], [num, complement])
                    }
                    break;
                case 2:
                    //we add a pair...
                    pairs.push([complement, num])
                    //and its reverse, IF num!==complement, to avoid a duplicate
                    if (complement!==num) pairs.push([num, complement])
                    //set keys for num and its complement to 0 in numCounter
                    //    to signify that this pair and its reverse have already been added
                    numCounter[num] = 0
                    numCounter[complement] = 0
                    break;
                case 3:
                    //same as case 2 but we never add the reverse
                    pairs.push([complement, num])
                    numCounter[num] = 0
                    numCounter[complement] = 0
            }
        }

        //if we haven't encountered this num yet
        if (numCounter[num]===undefined) numCounter[num] = 1
        //if we've already encountered this num and we're on question 1,
        //    we need to know how many there are since we need dupes
        else if (questionNum===1) numCounter[num]++
    }

    return pairs
}

console.log("Solution 1:", getAddendPairs(10, input, 1))
console.log("Solution 2:", getAddendPairs(10, input, 2))
console.log("Solution 3:", getAddendPairs(10, input, 3))