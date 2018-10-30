
# coding: utf-8

# In[52]:


import requests
import lxml.html as lh
import pandas as pd


# In[53]:


#This url changes per what year they ask for
url='http://registrar.psu.edu/academic_calendar/spring20.cfm'

#Create a handle, page, to handle the contents of the website
page = requests.get(url)

#Store the contents of the website under doc
doc = lh.fromstring(page.content)

#Parse data that are stored between <tr>..</tr> of HTML
tr_elements = doc.xpath('//tr')


# In[54]:


tr_elements = doc.xpath('//tr')

#Create empty list
col=[]
i=0

#For each row, store each first element (header) and an empty list
for t in tr_elements[0]:
    i+=1
    name=t.text_content()
    print('%d:"%s"'%(i,name))
    col.append((name,[]))


# In[55]:


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


# In[56]:


Dict={title:column for (title,column) in col}
df=pd.DataFrame(Dict)
#df.head(1)
#df[["Description", "Date"]]
#orient will change the format of JSON so we can use it accordingly.
df[["Description", "Date"]].to_json(orient='records')

