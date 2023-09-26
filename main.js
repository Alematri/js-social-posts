
import { posts } from "./db.js";

// Funzione per creare e aggiungere i post al feed
function renderPosts() {
  const container = document.getElementById("container");
  // Resettino tattico
  container.innerHTML = "";

  // Spammiamo attraverso l'array dei post
  posts.forEach((post) => {
      // Crea un nuovo elemento div per il post
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // Creazione dell'elemento per l'intestazione del post
      const postHeader = document.createElement("div");
      postHeader.classList.add("post__header");

      // Creazione dell'elemento per i dati dell'autore
      const postMeta = document.createElement("div");
      postMeta.classList.add("post-meta");

      const postMetaIcon = document.createElement("div");
      postMetaIcon.classList.add("post-meta__icon");

      // Creazione dell'immagine del profilo
      const profilePic = document.createElement("img");
      profilePic.classList.add("profile-pic");
      profilePic.src = post.author.image;
      profilePic.alt = post.author.name;

      // Creazione dell'elemento per i dati dell'autore
      const postMetaData = document.createElement("div");
      postMetaData.classList.add("post-meta__data");

      const postMetaAuthor = document.createElement("div");
      postMetaAuthor.classList.add("post-meta__author");
      postMetaAuthor.textContent = post.author.name;

      const postMetaTime = document.createElement("div");
      postMetaTime.classList.add("post-meta__time");
      postMetaTime.textContent = post.date;

      // Aggiungi gli elementi dell'intestazione all'elemento dell'intestazione
      postMetaIcon.appendChild(profilePic);
      postMetaData.appendChild(postMetaAuthor);
      postMetaData.appendChild(postMetaTime);
      postMeta.appendChild(postMetaIcon);
      postMeta.appendChild(postMetaData);
      postHeader.appendChild(postMeta);

      // Creazione dell'elemento per il testo del post
      const postText = document.createElement("div");
      postText.classList.add("post__text");
      postText.textContent = post.content;

      // Creazione dell'elemento per l'immagine del post
      const postImage = document.createElement("div");
      postImage.classList.add("post__image");

      const image = document.createElement("img");
      image.src = post.media;
      image.alt = "";

      postImage.appendChild(image);

      // Creazione dell'elemento per il piè di pagina del post
      const postFooter = document.createElement("div");
      postFooter.classList.add("post__footer");

      // Creazione dell'elemento per i "Mi Piace"
      const likes = document.createElement("div");
      likes.classList.add("likes");

      const likesCta = document.createElement("div");
      likesCta.classList.add("likes__cta");

      // Creazione del pulsante "Mi Piace"
      const likeButton = document.createElement("a");
      likeButton.classList.add("like-button", "js-like-button");
      likeButton.href = "#";
      likeButton.dataset.postid = post.id;

      const likeIcon = document.createElement("i");
      likeIcon.classList.add("like-button__icon", "fas", "fa-thumbs-up");

      const likeLabel = document.createElement("span");
      likeLabel.classList.add("like-button__label");
      likeLabel.textContent = "Mi Piace";

      // Aggiungi gli elementi dei "Mi Piace" al pulsante "Mi Piace"
      likeButton.appendChild(likeIcon);
      likeButton.appendChild(likeLabel);
      likesCta.appendChild(likeButton);

      // Creazione dell'elemento per il contatore dei "Mi Piace"
      const likesCounter = document.createElement("div");
      likesCounter.classList.add("likes__counter");
      likesCounter.innerHTML = `Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone`;

      // Aggiungi gli elementi dei "Mi Piace" al blocco dei "Mi Piace"
      likes.appendChild(likesCta);
      likes.appendChild(likesCounter);

      // Aggiungi gli elementi al piè di pagina del post
      postFooter.appendChild(likes);

      // Aggiungi tutti gli elementi al post
      postElement.appendChild(postHeader);
      postElement.appendChild(postText);
      postElement.appendChild(postImage);
      postElement.appendChild(postFooter);

      // Aggiungi il post al container
      container.appendChild(postElement);
  });
}

// Esegui la funzione per creare e aggiungere i post al feed
renderPosts();


// Funzione per salvare in un array gli id dei post ai quali abbiamo messo like

const likedPostIds = [];

function setupLikeButtons() {
  const likeButtons = document.querySelectorAll(".js-like-button");

  likeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
          event.preventDefault();
          const postId = button.getAttribute("data-postid");

          if (!likedPostIds.includes(postId)) {
              // Incrementa il contatore dei likes e cambia lo stile del bottone
              const likeCounter = document.getElementById(`like-counter-${postId}`);
              const currentLikes = parseInt(likeCounter.textContent);
              likeCounter.textContent = currentLikes + 1;
              button.classList.add("like-button--liked");

              // Aggiungi l'ID del post ai post che hai messo "Mi Piace"
              likedPostIds.push(postId);
              // Console log per visualizzare gli ID dei post con "Mi Piace"
              console.log("ID dei post ai quali hai messo Mi Piace:", likedPostIds);
          }
      });
  });
}

// Esegui la funzione per impostare la gestione dei like
setupLikeButtons();