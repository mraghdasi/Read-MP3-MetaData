const jsmediatags = window.jsmediatags

const constant = ["submit", "file", "form", "image", "title", "fileNameInp"]
constant.forEach((el) => {
    document.getElementById(el)
})

image.style.display = "none"

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let files = file.files[0]

    jsmediatags.read(files, {
        onSuccess: function (tag) {
            console.log(tag)

            let img = tag.tags.picture
            let base64String = ""
            for (let i = 0; i < img.data.length; i++) {
                base64String += String.fromCharCode(img.data[i])
            }
            let imageUrl =
                "data:" + img.format + ";base64," + window.btoa(base64String)

            image.style.display = "initial"
            image.setAttribute("src", imageUrl)
            image.setAttribute("alt", `${tag.tags.artist} - ${tag.tags.album}`)

            title.innerText = `Artist : ${tag.tags.artist}
            Title : ${tag.tags.title}
            Album : ${tag.tags.album}`
        },
        onError: function (error) {
            console.log(error)
        },
    })
})

// add file name in input
file.addEventListener("change", () => {
    let fileInfo = file.files[0].name
    fileNameInp.value = fileInfo
})
