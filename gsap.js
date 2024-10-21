// gsap work
var tl = gsap.timeline();
tl.from("nav",{
    y: -20,
    opacity: 0,
    duration: 0.5,
})

tl.from("nav .name", {
    y: -25,
    opacity: 0,
    duration: 0.8,
})

tl.from("nav .info a", {
    y: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.5
})

gsap.from("nav .mode",{
    y: -20,
    opacity: 0,
    duration: 0.5,
    delay: 0.8
})

gsap.from(".container",{
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay:1
})