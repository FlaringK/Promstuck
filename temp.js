var takentags = []

/* Get CSS MSPFA Variabels */
let getMSPFAVariables = startstring => {
    var str = MSPFA.story.y
    var indices = []
    var initstring = "@mspfa " + startstring
    var output = []

    for(var i=0; i<str.length;i++) {
        if (str.substring(i, i + initstring.length) == initstring) indices.push(i);
    }

    indices.forEach(index => {
        var groupText = str.substring(index, str.indexOf(";", index))

        function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
        }

        for(var i=0; i<groupText.length;i++) {
        if (groupText.substring(i, i + 2) == " \"") {
                var varString = groupText.substring(i + 2, groupText.indexOf("\"", i + 2) + 1)
                var newVarString = replaceAll(varString, " ", "```")
                groupText = groupText.replace(varString, newVarString)
            }
        }

        var group = groupText.split(" ")

        group.forEach((string, i) => {
        if (string[0] == "\"") {
            var oldstring = replaceAll(string, "```", " ")
            group[i] = oldstring.substring(1, oldstring.length - 1)
        }
        });

        group.shift()
        group.shift()
        output.push(group)
    })

    return output
}

let addA03 = () => {

    // Preface
    var preface = getPreface()
    document.getElementById('slide').prepend(preface)

    // Tags
    var tags = getTags()
    document.getElementById('slide').prepend(tags)

}

let getTags = () => {
    var newInfo = document.createElement("div")
    newInfo.id = "newInfo"

    var wrapper = document.createElement("dl")
    wrapper.id = "wrapper"
    newInfo.appendChild(wrapper)

    // Tags
    var usertags = getMSPFAVariables("ao3")

    usertags.forEach(e => {
        var newTitle = document.createElement("dt")
        var newTagList = document.createElement("dd")

        newTitle.innerText = e.shift()
        e.forEach(f => {
            var tag = document.createElement("a")
            tag.href = "https://mspfa.com/stories/?go=1&n=&t=" + f + "&h=14&o=favs&p=p&m=50"
            tag.innerText = f
            newTagList.appendChild(tag)
            takentags.push(f.toLowerCase())

            if (e.at(-1) !== f) {
                newTagList.appendChild(document.createTextNode(", "))
            }
        })

        wrapper.appendChild(newTitle)
        wrapper.appendChild(newTagList)
    })

    // Tag Title
    var tagTitle = document.createElement("dt")
    tagTitle.innerText = "Other tags:"
    wrapper.appendChild(tagTitle)

    // Tag links
    var tags = document.createElement("dd")
    MSPFA.story.t.forEach((e, i) => {
        if (!takentags.includes(e)) {
        var tag = document.createElement("a")
            tag.href = "https://mspfa.com/stories/?go=1&n=&t=" + e + "&h=14&o=favs&p=p&m=50"
            tag.innerText = e
            tags.appendChild(tag)
            
            if (i !== MSPFA.story.t.length - 1) {
                tags.appendChild(document.createTextNode(", "))
            }
        }
    })
    wrapper.appendChild(tags)
    
    // Stats
    // Stats Title
    var statsTitle = document.createElement("dt")
    statsTitle.innerText = "Stats:"
    wrapper.appendChild(statsTitle)
    
    // Statistics
    var statString = ""
    
    var creationDate = new Date(0)
    creationDate.setUTCSeconds(MSPFA.story.d / 1000)
    var CDstring = creationDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")
    statString += "Published: " + CDstring + "   "
    
    var updateDate = new Date(0)
    updateDate.setUTCSeconds(MSPFA.story.u / 1000)
    var UDstring = updateDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")
    statString += "Updated: " + UDstring + "   "
    
    statString += "Chapters: " + MSPFA.story.p.length + (MSPFA.story.h == 3 ? "/" + MSPFA.story.p.length : "/?") + "   "
    
    statString += document.querySelectorAll(".smol")[1] ? "Kudos: " + document.querySelectorAll(".smol")[1].nextSibling.data + "   " : ""
    
    var stats = document.createElement("dd")
    stats.innerText = statString
    wrapper.appendChild(stats)

    return newInfo
}

let getPreface = () => {
    var preface = document.createElement("div")
    preface.id = "preface"

    // Heading
    var heading = document.createElement("h2")
    heading.innerText = MSPFA.story.n
    preface.appendChild(heading)

    // Byline
    var byline = document.createElement("h3")
    var authorlink = document.createElement("a")
    authorlink.innerText = MSPFA.story.a
    authorlink.href = "https://mspfa.com/user/?u=" + MSPFA.story.c
    byline.appendChild(authorlink)
    preface.appendChild(byline)

    // Summery
    var summ = document.createElement("div")
    summ.id = "Summery"
    summ.innerHTML = '<h3 class="heading">Summary:</h3>'
    preface.appendChild(summ)

    // Info
    // var newinfo = document.createElement("div")
    // newinfo.innerText = MSPFA.story.r
    // summ.appendChild(newinfo)
    summ.appendChild(MSPFA.parseBBCode(MSPFA.story.r))

    return preface
}

addA03()