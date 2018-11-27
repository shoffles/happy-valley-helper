import requests
import lxml.html as lh
import pandas as pd

def changeUrl(term):
    #split url into scheme, netloc, PATH, query, fragment. We only need this for path
    url = list(urlsplit('https://www.registrar.psu.edu/academic_calendar/fall18.cfm'))
    
    #Assigning the old path to variable
    oldPath = url[2]

    #Splitting the path up by slashes
    components = oldPath.split('/')

    #Splitting the last section of the path by period so we can change the term to the variable semester
    compToChange = components[2].split('.')
    #Changes term 
    compToChange[0]= semester
    #Reassembles that portion of the path
    addPeriod ='.'.join(compToChange)
    #Updates the components of the path
    components[2]=addPeriod
    #Reassembles the updated path
    newPath = '/'.join(components)
    
    #Updates path in url
    url[2] = newPath
    #Unsplits url
    newUrl = urlunsplit(url)
    
    return newUrl

def main():
    url = changeUrl(semester)

    page = requests.get(url)

    #Store the contents of the website under doc
    doc = lh.fromstring(page.content)

    #Parse data that are stored between <tr>..</tr> of HTML
    tr_elements = doc.xpath('//tr')

    #Create empty list
    col=[]
    i=0

    #For each row, store each first element (header) and an empty list
    for t in tr_elements[0]:
        i+=1
        name=t.text_content()
        col.append((name,[]))

    #Since out first row is the header, data is stored on the second row onwards
    for j in range(1,len(tr_elements)):
        #T is our j'th row
        T=tr_elements[j]

        #i is the index of our column
        i=0

        #Iterate through each element of the row
        for t in T.iterchildren():
            data=t.text_content() 
            #Check if row is empty
            if i>0:
            #Convert any numerical value to integers
                try:
                    data=int(data)
                except:
                    pass
            #Append the data to the empty list of the i'th column
            col[i][1].append(data)
            #Increment i for the next column
            i+=1

    Dict={title:column for (title,column) in col}
    df=pd.DataFrame(Dict)
    #df.head(1)
    #df[["Description", "Date"]]
    #orient will change the format of JSON so we can use it accordingly.
    print(df[["Description", "Date"]].to_json(orient='records'))

if __name__ == '__main__':
    main()