import sys, json, nltk, datetime

co_sports = ['Football', 'Basketball', 'Track/Field', 'Fencing', 'Wrestling'] #non gender specific sports
gen_sports = ['Wrestling', 'Golf', 'Lacrosse', 'Tennis', 'Gymnastics', 'Volleyball', 'Swimming', 'Ice', 'Basketball'] #gender specific sports

date = str(datetime.datetime.now())[:10]

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would be on the first line, parse our JSON data from that
    input = json.loads(lines[0])

    return input

def finish(output):
    print(output)

def main():
    #get our data as an array from read_in()
    lines = read_in()

    output = "We took the"

    sport = nltk.word_tokenize(sys.argv[1])

    date = str(sys.argv[2])

    gender = ""

    for s in gen_sports: #This is in case the gender is not provided
        if sport[0] == s:
            for e in lines:
                for a in e:
                    dict = {}
                    dict = e[a]


                    title = nltk.word_tokenize(dict["title"])
                    for z in title:
                        if z == s:
                            for w in desc:
                                if w == "W":
                                    output += " win with a score of "
                                elif w == "L":
                                    output += " loss with a score of "
                            count = 0
                            for w in desc:
                                count += 1
                                for l in w:
                                    if l.isdigit():
                                        score = desc[(count - 1)]
                                        count = 0
                                        for l in score:
                                            count += 1
                                            if l == "\\":
                                                output += str(score[:(count - 1)])
                                                finish(output)
                                                exit()
                                        break

                            exit()

    if len(sport) > 1: #this is in case the gender is provided
        if sport[0] == "Men":
            gender = "Men"
        if sport[0] == "Women":
            gender = "Women"
        for s in gen_sports:
            if sport[2] == s:
                for e in lines:
                    for a in e:
                        dict = {}
                        dict = e[a]


                        title = nltk.word_tokenize(dict["title"])
                        desc = nltk.word_tokenize(dict["description"])
                        gender_correct = False
                        for z in title:
                            if z == gender:
                                gender_correct = True
                                continue
                            if gender_correct:
                                if z == s:

                                    for w in desc:
                                        if w == "W":
                                            output += " win with a score of "
                                        elif w == "L":
                                            output += " loss with a score of "
                                    count = 0
                                    for w in desc:
                                        count += 1
                                        for l in w:
                                            if l.isdigit():
                                                score = desc[(count - 1)]
                                                count = 0
                                                for l in score:
                                                    count += 1
                                                    if l == "\\":
                                                        output += str(score[:(count - 1)])
                                                        finish(output)
                                                        exit()
                                                break

                                    exit()

    if len(sport) == 1: #This is in case the sport is not gender specific
        for s in co_sports:
            if sport[0] == s:
                for e in lines:
                    for a in e:
                        dict = {}
                        dict = e[a]

                        title = nltk.word_tokenize(dict["title"])
                        desc = nltk.word_tokenize(dict["description"])

                        for z in title:
                            if z == s:
                                for w in desc:
                                    if w == "W":
                                        output += " win with a score of "
                                    elif w == "L":
                                        output += " loss with a score of "
                                count = 0
                                for w in desc:
                                    count += 1
                                    for l in w:
                                        if l.isdigit():
                                            score = desc[(count - 1)]
                                            count = 0
                                            for l in score:
                                                count += 1
                                                if l == "\\":
                                                    output += str(score[:(count - 1)])
                                                    finish(output)
                                                    exit()
                                            break

                                exit()

if __name__ == '__main__':
    main()
