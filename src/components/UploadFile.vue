<!-- <template>
  <div>
    <input type="file" @change="handleFiles" multiple />
    <ul v-if="imageUrls.length">
      <li v-for="url in imageUrls" :key="url">
        <img :src="url" alt="Uploaded Image" class="uploaded-image" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UploadFile",
  data() {
    return {
      imageUrls: [],
    };
  },
  methods: {
    handleFiles(event) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>

<style scoped>
.uploaded-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px;
}
</style> -->
<!-- 
<template>
  <div>
    <input type="file" @change="handleFiles" multiple />
    <ul v-if="mediaData.length">
      <li v-for="data in mediaData" :key="data.url">
        <img
          :src="data.url"
          :class="{ 'video-thumbnail': data.isVideo }"
          alt="Uploaded Media"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaData: [],
    };
  },
  methods: {
    handleFiles(event) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.mediaData.push({ url: e.target.result, isVideo: false });
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("video/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const video = document.createElement("video");
            video.src = e.target.result;
            video.currentTime = 3;
            video.onloadedmetadata = () => {
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnail = canvas.toDataURL("image/jpeg");
              this.mediaData.push({ url: thumbnail, isVideo: true });
            };
          };
          reader.readAsDataURL(file);
        }
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px;
}

.video-thumbnail {
  border: 2px solid red;
}
</style> -->
<!-- 
<template>
  <div>
    <input type="file" @change="handleFiles" multiple />
    <ul v-if="mediaData.length">
      <li v-for="data in mediaData" :key="data.url">
        <img
          :src="data.url"
          :class="{ 'video-thumbnail': data.isVideo }"
          alt="Uploaded Media"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaData: [],
    };
  },
  methods: {
    handleFiles(event) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.mediaData.push({ url: e.target.result, isVideo: false });
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("video/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const video = document.createElement("video");
            video.src = e.target.result;

            video.onloadeddata = () => {
              video.currentTime = 3;
            };

            video.onseeked = () => {
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnail = canvas.toDataURL("image/jpeg");
              this.mediaData.push({ url: thumbnail, isVideo: true });
            };
          };
          reader.readAsDataURL(file);
        }
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px;
}

.video-thumbnail {
  border: 2px solid red;
}
</style> -->

<!-- <template>
  <div>
    <input type="file" @change="handleFiles" multiple />
    <ul v-if="mediaData.length">
      <li v-for="data in mediaData" :key="data.url">
        <img
          :src="data.url"
          :class="{ 'video-thumbnail': data.isVideo }"
          alt="Uploaded Media"
        />
      </li>
    </ul>
    <button @click="checkFile">파일리스트</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaData: [],
    };
  },
  methods: {
    checkFile() {
      console.log("@@@@", this.mediaData);
    },
    validateFile(file) {
      const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      const videoTypes = ["video/mp4", "video/avi"];
      const maxImageSize = 1 * 1024 * 1024; // 7MB
      const maxVideoSize = 10 * 1024 * 1024; // 20MB

      if (imageTypes.includes(file.type) && file.size <= maxImageSize) {
        return true;
      } else if (videoTypes.includes(file.type) && file.size <= maxVideoSize) {
        return true;
      } else if (imageTypes.includes(file.type) && file.size > maxImageSize) {
        alert("파일용량을 낮춰주세요");
        return false;
      } else if (videoTypes.includes(file.type) && file.size > maxVideoSize) {
        alert("파일용량을 낮춰주세요");
        return false;
      } else {
        alert("잘못된 파일입니다");
        return false;
      }
    },

    handleFiles(event) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        if (!this.validateFile(file)) {
          return; // Move to the next iteration if validation fails
        }

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.mediaData.push({ url: e.target.result, isVideo: false });
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("video/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const video = document.createElement("video");
            video.src = e.target.result;

            video.onloadeddata = () => {
              video.currentTime = 3;
            };

            video.onseeked = () => {
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const thumbnail = canvas.toDataURL("image/jpeg");
              this.mediaData.push({ url: thumbnail, isVideo: true });
            };
          };
          reader.readAsDataURL(file);
        }
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px;
}

.video-thumbnail {
  border: 10px solid red;
}
</style> -->

<!-- <template>
  <div>
    <input type="file" @change="handleFiles" multiple />
    <ul v-if="mediaData.length">
      <li v-for="data in mediaData" :key="data.url">
        <img
          :src="data.url"
          :class="{ 'video-thumbnail': data.isVideo }"
          alt="Uploaded Media"
        />
      </li>
    </ul>
    <button @click="checkFile">파일리스트</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaData: [],
    };
  },
  methods: {
    checkFile() {
      console.log("@@@@", this.mediaData);
    },

    validateFile(file) {
      const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      const videoTypes = ["video/mp4", "video/avi"];
      const maxImageSize = 7 * 1024 * 1024; // 7MB
      const maxVideoSize = 20 * 1024 * 1024; // 20MB

      if (imageTypes.includes(file.type) && file.size <= maxImageSize) {
        return true;
      } else if (videoTypes.includes(file.type) && file.size <= maxVideoSize) {
        return true;
      } else if (imageTypes.includes(file.type) && file.size > maxImageSize) {
        alert("파일용량을 낮춰주세요");
        return false;
      } else if (videoTypes.includes(file.type) && file.size > maxVideoSize) {
        alert("파일용량을 낮춰주세요");
        return false;
      } else {
        alert("잘못된 파일입니다");
        return false;
      }
    },

    handleFiles(event) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        if (!this.validateFile(file)) {
          return;
        }

        if (file.type.startsWith("image/")) {
          const imageUrl = URL.createObjectURL(file);
          this.mediaData.push({ url: imageUrl, isVideo: false, fileObj: file });
        } else if (file.type.startsWith("video/")) {
          const video = document.createElement("video");
          const videoUrl = URL.createObjectURL(file);
          video.src = videoUrl;

          video.onloadeddata = () => {
            video.currentTime = 3;
          };

          video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL("image/jpeg");
            this.mediaData.push({
              url: thumbnail,
              isVideo: true,
              fileObj: file,
            });
          };
        }
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px;
}

.video-thumbnail {
  border: 2px solid red;
}
</style> -->

<template>
  <div>
    <input type="file" @change="handleFiles" multiple />
    <button @click="downloadMedia">모든 미디어 다운로드</button>
    <button @click="checkFile">파일리스트</button>

    <ul v-if="mediaData.length">
      <li v-for="data in mediaData" :key="data.url">
        <img
          :src="data.url"
          :class="{ 'video-thumbnail': data.isVideo }"
          alt="Uploaded Media"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaData: [],
    };
  },
  methods: {
    checkFile() {
      console.log("@@@@", this.mediaData);
    },
    validateFile(file) {
      const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
      const videoTypes = ["video/mp4", "video/avi"];
      const maxImageSize = 1 * 1024 * 1024; // 7MB
      const maxVideoSize = 10 * 1024 * 1024; // 20MB

      if (imageTypes.includes(file.type) && file.size <= maxImageSize) {
        return true;
      } else if (videoTypes.includes(file.type) && file.size <= maxVideoSize) {
        return true;
      } else if (imageTypes.includes(file.type) && file.size > maxImageSize) {
        alert("파일용량을 낮춰주세요");
        return false;
      } else if (videoTypes.includes(file.type) && file.size > maxVideoSize) {
        alert("파일용량을 낮춰주세요");
        return false;
      } else {
        alert("잘못된 파일입니다");
        return false;
      }
    },

    handleFiles(event) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        if (!this.validateFile(file)) {
          return;
        }

        if (file.type.startsWith("image/")) {
          const imageUrl = URL.createObjectURL(file);
          this.mediaData.push({ url: imageUrl, isVideo: false, fileObj: file });
        } else if (file.type.startsWith("video/")) {
          const video = document.createElement("video");
          const videoUrl = URL.createObjectURL(file);
          video.src = videoUrl;

          video.onloadeddata = () => {
            video.currentTime = 3;
          };

          video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL("image/jpeg");
            this.mediaData.push({
              url: thumbnail,
              isVideo: true,
              fileObj: file,
            });
          };
        }
      });
    },

    // downloadMedia() {
    //   this.mediaData.forEach((data) => {
    //     const link = document.createElement("a");
    //     link.href = data.url;
    //     // link.download = data.fileObj.name;
    //     link.download = data.isVideo ? "video.mp4" : "image.jpg";
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   });
    // },
    downloadMedia() {
      this.mediaData.forEach((data) => {
        const link = document.createElement("a");
        if (data.isVideo) {
          link.href = URL.createObjectURL(data.fileObj);
        } else {
          link.href = data.url;
        }
        link.download = data.fileObj.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 10px;
}

.video-thumbnail {
  border: 2px solid red;
}
</style>
