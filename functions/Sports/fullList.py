import sys, json

def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    input = json.loads(lines[0])

    return input

def main():
    #get our data as an array from read_in()
    lines = read_in()
    out = "{"
    for e in lines:
        for a in e:
            dict = {}
            dict = e[a]
            for t in dict:
                out += "[" + str(dict[t]) + "]"
        out += "}"
        print(out)
        out = "{"

if __name__ == '__main__':
    main()
