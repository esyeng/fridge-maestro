const picData = [
    {
        image: 'https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg',
    },
    {
        image: 'https://foodish-api.herokuapp.com/images/dosa/dosa1.jpg',
    },
    {
        image: 'https://foodish-api.herokuapp.com/images/burger/burger63.jpg',
    },
    {
        image: 'https://foodish-api.herokuapp.com/images/biryani/biryani30.jpg',
    },
    {
        image: 'https://foodish-api.herokuapp.com/images/idly/idly33.jpg',
    },
    {
        image: 'https://foodish-api.herokuapp.com/images/dosa/dosa41.jpg',
    },
    {
        image: 'https://foodish-api.herokuapp.com/images/biryani/biryani25.jpg',
    },
    {
        image: 'https://foodish-api.herokuapp.com/images/dosa/dosa72.jpg',
    },
    {
        image: 'https://foodish-api.herokuapp.com/images/burger/burger73.jpg',
    },
];

const queryBtn = document.getElementById('get_photos');
const clearBtn = document.getElementById('clear_photos');
const photoContainer = document.getElementById('food_container');

queryBtn.addEventListener('click', (e) => {
    if (e.target) {
        if (
            photoContainer.childElementCount >= 0 &&
            photoContainer.childElementCount <= 9
        ) {
            picData.forEach((item) => {
                let newChildNode = document.createElement('img');
                newChildNode.src = item.image;
                newChildNode.setAttribute('class', 'food_container_img');
                photoContainer.appendChild(newChildNode);
            });
        }
    }
});

clearBtn.addEventListener('click', (e) => {
    if (e.target) {
        while (photoContainer.firstChild) {
            photoContainer.removeChild(photoContainer.firstChild);
        }
        return;
    }
});
