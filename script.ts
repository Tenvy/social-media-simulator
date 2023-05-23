interface Post {
  profile_image: string;
  username: string;
  post_image: string;
  description: string;
}

class MediaPost {
  private posts: Post[] = [
		{
			profile_image: "./assets/anime.png",
			username: "sisca024",
			post_image: "./assets/wallpaper.png",
			description: "Absolutely breathtaking! 😍🌅 Sharing a magical moment with my love on the edge of a cliff, overlooking the mesmerizing sunset. (•‿•)💑 The golden hues of the sky blend perfectly with the warmth of our embrace, creating a picture-perfect memory. (◑‿◐)✨",
		},	
		{
			profile_image: "./assets/raya.png",
			username: "raya_re",
			post_image: "./assets/spaghetti.webp",
			description: "If you had one shot or one opportunity to seize everything you ever wanted, one moment would you captured it? or just let it slip",
		},
		{
			profile_image: "./assets/abduh.jpg",
			username: "abduh23",
			post_image: "./assets/berserk.jpg",
			description: "Jalani hari dengan sepenuh hati, Jangan sesali apa yang sudah terjadi.",
		},
		{
			profile_image: "./assets/odori.jpeg",
			username: "tenvy.official",
			post_image: "./assets/profile.webp",
			description: "Dengan kekasih tercinta!, aku mencintainya lebih dari dirinya mencintaiku <3. namanya selalu ada di hatiku💖, mengingatnya selalu membuat",
		},
		{
			profile_image: "./assets/profile.webp",
			username: "ai_hoshino",
			post_image: "./assets/post.jpg",
			description: "OMG! 🥞🌸 Just had the most amazing pancakes ever! (•‿•)⁠ These fluffy delights are pure happiness on a plate! (◑‿◐)✨ Topped with fresh fruits, drizzled with maple syrup, and dusted with powdered sugar, they were a taste sensation! (-‿◦☀)✨ I can't even describe how heavenly they were! ಥ‿ಥ💖 Who else loves pancakes like this? (づ ◕‿◕ )づ🌈",
		},
  ];

  public addPost(newPost: Post): void {
    this.posts.push({ ...newPost });
  }

  public getPosts(): Post[] {
    return this.posts.reverse();
  }

  
}


const media = new MediaPost();

const modal = document.querySelector(".modal-container") as HTMLElement;
const postContainer = document.querySelector(".post") as HTMLElement;

const loadPosts = () => {
  const html = media.getPosts().map((post) => 
		  	`
          <div class="post-list">
            <div class="head-post">
              <div>
                <img class="image-profile" src="${post.profile_image}" alt="profile-picture">
              </div>
              <h2>${post.username}</h2>
            </div>
            <div class="image-post-container">
              <img class="image-post" src="${post.post_image}" alt="image-post">
            </div>
            <div class="description-container">
              <div class="description">
                <h2>from ${post.username}</h2>
                <p>${post.description}</p>
              </div>
            </div>
          </div>
        `
    ).join("");

  postContainer.innerHTML = html;
};

const form = document.querySelector("#post_form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

	const objInput = {
		profileInput : (document.querySelector("#profile_input") as HTMLInputElement).files,
		usernameInput : (document.querySelector("#username_input") as HTMLInputElement).value,
		postInput : (document.querySelector("#post_input") as HTMLInputElement).files,
		descriptionInput : (document.querySelector("#description_input") as HTMLInputElement).value,
	}

  if (
    objInput.profileInput &&
    objInput.usernameInput &&
    objInput.postInput &&
    objInput.descriptionInput
  ) {
    const profileImageFile = objInput.profileInput[0];
    const postImageFile = objInput.postInput[0];

    const profileImageReader = new FileReader();
    const postImageReader = new FileReader();

    profileImageReader.onload = () => {
      const profileImageUrl = profileImageReader.result as string;
      const postImageUrl = postImageReader.result as string;

      modal.style.display = "none";
      media.addPost({
        profile_image: profileImageUrl,
        username: objInput.usernameInput,
        post_image: postImageUrl,
        description: objInput.descriptionInput,
      });
      loadPosts();
      form.reset();
    };

    postImageReader.onload = () => {
      profileImageReader.readAsDataURL(profileImageFile);
    };
		postImageReader.readAsDataURL(postImageFile);

  }
});
// Create post button toggle
const modalHandler = () => {
  modal.style.display = "flex";
};

const postButtonClickHandler = () => {
  modalHandler();
};

const postButtons = document.querySelectorAll(".create-post-button");

postButtons.forEach((button) => {
  button.addEventListener("click", postButtonClickHandler);
});

// dark theme toggle

const themeHandler = () => {
  document.body.classList.toggle("dark-theme")
}

const darkToggleHandler = () => {
  themeHandler()
}

const darkToggle = document.querySelectorAll(".dark-toggle");

darkToggle.forEach((button) => {
  button.addEventListener("click", darkToggleHandler);
});

window.addEventListener("load", () => {
  loadPosts();
});
