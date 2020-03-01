module.exports = {
    syntax: 'postcss-scss',
    plugins: [
        require('postcss-import'),
        require('postcss-url'),
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-preset-env')({ stage: 1 }),
    ]
};