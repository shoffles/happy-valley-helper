import sys, json, nltk, datetime

co_sports = ['Football', 'Basketball', 'Track/Field', 'Fencing'] #non gender specific sports
gen_sports = ['Wrestling', 'Golf', 'Lacrosse', 'Tennis', 'Gymnastics', 'Volleyball', 'Swimming', 'Ice', 'Basketball'] #gender specific sports

date = str(datetime.datetime.now())[:10]

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would be on the first line, parse our JSON data from that
    input = json.loads(lines[0])

    return input

def main():
    #get our data as an array from read_in()
    lines = read_in()

    sport = nltk.word_tokenize(sys.argv[1])

    print(sport)

    gender = ""
    if len(sport) > 1:
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
                        if str(dict["startdate"])[:4] < date[:4]:
                            continue
                        if str(dict["startdate"])[:4] >= date[:4]:
                            if str(dict["startdate"])[5:7] < date[5:7]:
                                continue
                        if str(dict["startdate"])[:4] >= date[:4]:
                            if str(dict["startdate"])[5:7] >= date[5:7]:
                                if str(dict["startdate"])[8:10] < date[8:10]:
                                    continue

                        title = nltk.word_tokenize(dict["title"])
                        gender_correct = False
                        for z in title:
                            if z == gender:
                                gender_correct = True
                                continue
                            if gender_correct:
                                if z == s:
                                    for t in dict:
                                        print(dict[t])
                                    exit()

    if len(sport) == 1:
        for s in co_sports:
            if sport[0] == s:
                for e in lines:
                    for a in e:
                        dict = {}
                        dict = e[a]
                        if str(dict["startdate"])[:4] < date[:4]:
                            continue
                        if str(dict["startdate"])[:4] >= date[:4]:
                            if str(dict["startdate"])[5:7] < date[5:7]:
                                continue
                        if str(dict["startdate"])[:4] >= date[:4]:
                            if str(dict["startdate"])[5:7] >= date[5:7]:
                                if str(dict["startdate"])[8:10] < date[8:10]:
                                    continue
                        title = nltk.word_tokenize(dict["title"])
                        for z in title:
                            if z == s:
                                for t in dict:
                                    print(str(dict[t]))
                                exit()


if __name__ == '__main__':
    main()
