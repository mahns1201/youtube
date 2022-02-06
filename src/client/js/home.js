const video = document.querySelectorAll('article');

// const handleClickThumbnail = event => {
//   // console.log(video.dataset);
//   // console.log(element);
// };

video.forEach(element => {
  element.addEventListener('click', element => {
    // console.log(element.path[1].dataset.id);

    const { id } = element.path[1].dataset;
    console.log(element.path);

    // const found = element.path.find(element => element === 'article.video');
    // console.log(found);
    // const a = document.createElement('a');
    // a.href = `/videos/${id}`;
    // document.body.appendChild(a);
    // a.click();
  });
});

// video.addEventListener('click', handleClickThumbnail);
