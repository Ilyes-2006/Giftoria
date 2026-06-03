import React from "react"
import './PageHero.css';

export default function PageHero({ title, subtitle,hideDivider }) { 
    return (
<section className="page-hero">
    <h1>{title}</h1>
    <p>{subtitle}</p>
    {!hideDivider &&<hr className="page-hero-divider" />}
</section>   
    )
}