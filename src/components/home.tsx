import React from "react";
import Knowledge from "../../public/images/knowledge.svg";
import Custom from "../../public/images/custom.svg";
import Explore from "../../public/images/explore.svg";

const intro = (
<section className="main-intro">
<article className="main-intro__article">
<h1 className="main-intro__header">Choose Your Journey</h1>
<p className="main-intro__text">A community creating and sharing interactive stories that envoke wonder, and inspire young writers to unleash their passion in a special way!</p>
<button className="main-intro__button">Get Started</button>
</article>
</section>
);

interface FeatureProps {
name: string;
body: string;
action: string;
img: string;
link: string;
}

function Feature({name, body, img, action, link}: FeatureProps) {
return (
<article className={`main-features__feature main-features__${name}`}>
<h2 className="main-features__feature-header"><i>{name}</i></h2>
<img className="main-features__feature-img" src={img}/>
<p className="main-features__feature-text">{body}</p>
<a className="main-features__feature-link" href={link}>{action}</a>
</article>
);
}

const features = (
<section className="main-features">
<Feature name="Immersion" body="A reading experience powered by an interactive tree of options a writer can customize, allowing to add as many possibilities in a story as possible to immerse a reader into their world." img={Knowledge} action="Read" link="" />
<Feature name="Customization" body="Our editor presents an interface that allows authors to customize a reader's experience to their liking, based on possible desicions that can alter the storyline." img={Custom} action="Create" link="" />
<Feature name="Exploration" body="Our browsing page allows you to dig through a plethora of stories of different genres and featuring different subjects, from horror, to comedy and everything in between." img={Explore} action="Explore" link="" />
</section>
);

export default function Home(): JSX.Element {
return (
<>
{intro}
{features}
</>
);
}
