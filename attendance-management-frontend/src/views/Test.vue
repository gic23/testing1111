<template>
  <div>
    <div ref="content">
      <!-- Your content to be exported here -->
    </div>
    <button @click="exportImage">Export Image</button>
  </div>
</template>

<script>
export default {
  methods: {
    exportImage() {
      const canvas = document.createElement('canvas');
      const content = this.$refs.content;
      canvas.width = content.offsetWidth;
      canvas.height = content.offsetHeight;
      const context = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const link = document.createElement('a');
        link.download = 'my-exported-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      image.src = 'data:image/svg+xml,' + encodeURIComponent(content.innerHTML);
    }
  }
};
</script>
