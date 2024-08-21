const getUrlPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const p = urlParams.get("page")
  return p ? p : "home"
}

const loadPage = async () => {
  // document.getElementById("daytah").className = ""
  pageHtml = await fetch(`./pages/${getUrlPage()}.html`).then(e => e.text())
  // document.getElementById("daytah").className = "hidden"

  document.getElementById("content").innerHTML = pageHtml
  window.scrollTo(0, 0);

  document.querySelectorAll("#content .pageLink").forEach(a => { a.addEventListener("click", evt => clickLink(evt, a.href)) })
}

const clickLink = (event, link) => {
  console.log(link)
  event.preventDefault()
  history.pushState(null, '', link)
  loadPage()
}

document.querySelectorAll(".pageLink").forEach(a => { a.addEventListener("click", evt => clickLink(evt, a.href)) })

loadPage()