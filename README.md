# Image Processing API

Image processing API to resize images.

# Usage

Use below script to compile the project

```bash
npm run build
```

Execute unit test

```bash
npm run jasmine
```

Complile and run unit test

```bash
npm run test
```

Start the development server

```bash
npm run start
```

Check for linting errors

```bash
npm run lint
```

Run prettier

```bash
npm run prettier
```

# Endpoints

```
/api/images?filename=<filename>&width=<width>&height=<height>
```

```
/api/images?filename=<filename>&width=<width>&height=<height>&format=jpeg
```

```
/api/images?filename=<filename>&width=<width>&height=<height>&format=png
```

# More features

-   Added option to process PNG images
-   Named thumb images with size to store multiple sizes of same image
-   Added proper log statements
