// const picData = [
//     {
//         image: 'https://foodish-api.herokuapp.com/images/pizza/pizza43.jpg',
//     },
//     {
//         image: 'https://foodish-api.herokuapp.com/images/dosa/dosa1.jpg',
//     },
//     {
//         image: 'https://foodish-api.herokuapp.com/images/burger/burger63.jpg',
//     },
//     {
//         image: 'https://foodish-api.herokuapp.com/images/biryani/biryani30.jpg',
//     },
//     {
//         image: 'https://foodish-api.herokuapp.com/images/idly/idly33.jpg',
//     },
//     {
//         image: 'https://foodish-api.herokuapp.com/images/dosa/dosa41.jpg',
//     },
//     {
//         image: 'https://foodish-api.herokuapp.com/images/biryani/biryani25.jpg',
//     },
//     {
//         image: 'https://foodish-api.herokuapp.com/images/dosa/dosa72.jpg',
//     },
//     {
//         image: 'https://foodish-api.herokuapp.com/images/burger/burger73.jpg',
//     },
// ];

const queryBtn = document.getElementById('get_photos');
const clearBtn = document.getElementById('clear_photos');
const numSelect = document.getElementById('num_select');
const photoContainer = document.getElementById('food_container');

const getPhotosXML = (num) => {
    const generate = new Promise((resolve, reject) => {
        fetch(`http://localhost:5500/${num}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((json) => {
                resolve(json);
                console.log('parsed json', json);
            })
            .catch((err) => {
                reject((err) => console.error(err));
            });
    });
    return generate.then((res) => {
        console.log(res);
        return res;
    });
};

numSelect.addEventListener('change', (e) => {
    numSelect.value = e.target.value;
});

queryBtn.addEventListener('click', async (e) => {
    if (e.target) {
        if (
            photoContainer.childElementCount >= 0 &&
            photoContainer.childElementCount <= 9
        ) {
            const numItemsToGet = numSelect.value;
            const picUrlObj = await getPhotosXML(numItemsToGet);
            const picPack = Object.keys(picUrlObj);
            const picData = Object.values(picUrlObj);

            picPack.forEach((i) => {
                let newChildNode = document.createElement('img');
                newChildNode.src = picData[i].body.image;
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

// console.log(getPhotosXML(3));
