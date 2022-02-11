const video = document.querySelectorAll('article');
const avatar = document.querySelector('.avatar');

// const handleClickThumbnail = event => {
//   // console.log(video.dataset);
//   // console.log(element);
// };

//TODO 글자 클릭 시, 이동 안 됨.
video.forEach(element => {
  element.addEventListener('click', element => {
    // console.log(element.path[1].dataset.id);

    const { id } = element.path[1].dataset;
    console.log(element.path);

    const found = element.path.find(element => element === 'article.video');
    console.log(found);
    const a = document.createElement('a');
    a.href = `/videos/${id}`;
    document.body.appendChild(a);
    a.click();
  });
});

const handleClickAvatar = () => {
  const a = document.createElement('a');
  a.href = `/users/edit`;
  document.body.appendChild(a);
  a.click();
};

// video.addEventListener('click', handleClickThumbnail);
avatar.addEventListener('click', handleClickAvatar);
