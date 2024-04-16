![App-Image](https://project-images-bucket-1.s3.amazonaws.com/chef-rand.png)

# Recipe Randomizer Application

Have the ingredients but don't know what to cook? Use our Recipe Randomizer! A web application that returns a randomized recipe with the option to provide a list of ingredients. This applicatiion is built with React, NodeJS, Express amongst others, with full coverage using Cypress! 

# Installation

To use this application, you need to have npm and nodejs installed. You will also need to provide an API key provided by Spoonacular -- they have a free 150 API request per day. To run this app, simply do the following, in order:

**Go to the frontend**

```
npm install 
npm run dev
```

**Go to the backend**

```
npm install
npm run server
```
Voila! Now you have app running and ready to go. 

# Reflection

The dev environment setup on this one was okay. The problem with it was the dependency duplication. Like if I want to use axios on both frontend and backend, I will have to install it on both directory. I had to do this because I was having trouble with setting up ES6 on both frontend and backend, and Typescript is giving me troubles because of it, so I stucked with it. Anyways, the project is working just fine besides that problem. Cypress was fairly easy to setup, and the visual tooling has been very helpful. Setting up spoonacular API was straightforward. I just have to learn what I need to use, and once I got that, I was able to query for recipes. During this development, I was working more on trying to deploy it with EC2 (Instance, Target Groups, ELB, EBS), Certificate Manager, Route53, Godaddy, and Nginx, so I was putting more time on that part. I learned how to use Nginx properly during this time, and made use of systemd to run my app as a service. There were times where I got stuck but I was able too figure it out eventually through research. Overall, this was a good project and I have learned a lot from it. This is also a part of a series of projects that I'm currently doing to help improve my skills on full stack development with UI/UX.