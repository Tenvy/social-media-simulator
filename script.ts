interface Post {
  id: number;
  profile_image: string;
  username: string;
  post_image: string;
  description: string;
  timestamp: Date;
}

class MediaPost {

  private addMinutes = (date: Date, minutes: number): Date => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  };

  private posts: Post[] = [
		{
      id: 5,
			profile_image: "./assets/anime.png",
			username: "sisca024",
			post_image: "./assets/wallpaper.png",
			description: "Absolutely breathtaking! 😍🌅 Sharing a magical moment with my love on the edge of a cliff, overlooking the mesmerizing sunset. (•‿•)💑 The golden hues of the sky blend perfectly with the warmth of our embrace, creating a picture-perfect memory. (◑‿◐)✨",
      timestamp: this.addMinutes(new Date(),-70)
    },	
		{
      id: 4,
			profile_image: "./assets/raya.png",
			username: "raya_re",
			post_image: "./assets/spaghetti.webp",
			description: "If you had one shot or one opportunity to seize everything you ever wanted, one moment would you captured it? or just let it slip",
      timestamp: this.addMinutes(new Date(),-60)
    },
		{
      id: 3,
			profile_image: "./assets/abduh.jpg",
			username: " abduh23",
			post_image: "./assets/berserk.jpg",
			description: "Jalani hari dengan sepenuh hati, Jangan sesali apa yang sudah terjadi.",
      timestamp: this.addMinutes(new Date(),-50)
    },
		{
      id: 2,
			profile_image: "./assets/odori.jpeg",
			username: "tenvy.official",
			post_image: "./assets/profile.webp",
			description: "Dengan kekasih tercinta!, aku mencintainya lebih dari dirinya mencintaiku <3. namanya selalu ada di hatiku💖, mengingatnya selalu membuat",
      timestamp: this.addMinutes(new Date(),-30)
    },
		{
      id: 1,
			profile_image: "./assets/profile.webp",
			username: "ai_hoshino",
			post_image: "./assets/post.jpg",
			description: "OMG! 🥞🌸 Just had the most amazing pancakes ever! (•‿•)⁠ These fluffy delights are pure happiness on a plate! (◑‿◐)✨ Topped with fresh fruits, drizzled with maple syrup, and dusted with powdered sugar, they were a taste sensation! (-‿◦☀)✨ I can't even describe how heavenly they were! ಥ‿ಥ💖 Who else loves pancakes like this? (づ ◕‿◕ )づ🌈",
      timestamp: this.addMinutes(new Date(),-10)
    },
  ];

  private postIdCounter: number = 6;

  public addPost(newPost: Omit<Post, "id">): void {
    const post: Post = {
      id: this.postIdCounter++,
      ...newPost,
    };
    post.timestamp = new Date();
    this.posts.push(post);
  }

  public deletePost(selectedPost: number):void{
    const index = this.posts.findIndex(posts => posts.id === selectedPost);
    if ( index !== -1 ) {
        this.posts.splice(index, 1);
    }
  }

  public getPosts(): Post[] {
    return this.posts.slice().reverse();
  }

}

const media = new MediaPost();

const modal = document.querySelector(".modal-container") as HTMLElement;
const postContainer = document.querySelector(".post") as HTMLElement;

const formatTimestamp = (timestamp: Date): string => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - timestamp.getTime()); 

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds} seconds ago`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minutes ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diff / day);
    return `${days} days ago`;
  }
};

const loadPosts = () : void => {
  const html = media.getPosts().map((post) => `
      <div class="post-list">
        <div class="head-post">
          <div>
            <img class="image-profile" src="${post.profile_image}" alt="profile-picture">
            <h2>${post.username}</h2>
          </div>
          <button onclick="deletePost(event)" data-id="${post.id}" class="delete-button">Delete</button>
        </div>
        <div class="image-post-container">
          <img class="image-post" src="${post.post_image}" alt="image-post">
        </div>
        <div class="description-container">
          <div class="description">
            <h2>from ${post.username}</h2>
            <p>${post.description}</p>
            <p class="timestamp">${formatTimestamp(post.timestamp)}</p>
          </div>
        </div>
      </div>
    `)
    .join("");

  postContainer.innerHTML = html;
};



const deletePost = (event: Event) => {
  const button = event.target as HTMLButtonElement;
  const id = button.getAttribute("data-id");
  if (id) {
    const postId = parseInt(id);
    media.deletePost(postId);
    loadPosts();
  }
};

const form = document.querySelector("#post_form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const profileInput = (document.querySelector("#profile_input") as HTMLInputElement).files;
  const usernameInput = (document.querySelector("#username_input") as HTMLInputElement).value;
  const postInput = (document.querySelector("#post_input") as HTMLInputElement).files;
  const descriptionInput = (document.querySelector("#description_input") as HTMLInputElement).value;

  if (profileInput && usernameInput && postInput && descriptionInput) {
    const profileImageFile = profileInput[0];
    const postImageFile = postInput[0];

    const profileImageReader = new FileReader();
    const postImageReader = new FileReader();

    profileImageReader.onload = () => {
      const profileImageUrl = profileImageReader.result as string;
      const postImageUrl = postImageReader.result as string;

      modal.style.display = "none";
      media.addPost({
        profile_image: profileImageUrl,
        username: usernameInput,
        post_image: postImageUrl,
        description: descriptionInput,
        timestamp: new Date()
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
const modalHandler = (): void => {
  modal.style.display = "flex";
};

const postButtonClickHandler = (): void => {
  modalHandler();
};

const postButtons = document.querySelectorAll(".create-post-button");

postButtons.forEach((button) => {
  button.addEventListener("click", postButtonClickHandler);
});

// dark theme toggle

const themeHandler = (): void => {
  document.body.classList.toggle("dark-theme")
}

const darkToggleHandler = (): void => {
  themeHandler()
}

const darkToggle = document.querySelectorAll(".dark-toggle");

darkToggle.forEach((button) => {
  button.addEventListener("click", darkToggleHandler);
});

window.addEventListener("load", () => {
  loadPosts();
});
