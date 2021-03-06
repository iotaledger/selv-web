import React from 'react';
import biodiversity from '../assets/registry/biodiversity-loss.jpg';
import climate_change from '../assets/registry/climate-change.jpg';
import fresh_water from '../assets/registry/freshwater.jpg';
import land_use from '../assets/registry/land-use-change.jpg';
import Popover from './Popover';

const cardsContent = [
	{
		image: climate_change,
		status: 'exceeded',
		boundary: '350-450 ppm',
		value: '410 and rising',
		title: 'Climate change',
		body: 'Human activities, like fossil-fuel energy production, release greenhouse gases into the air. This results in global warming, effects of which include rising temperatures, more frequent extremes of weather, and sea level rise.'
	},
    {
		image: fresh_water,
		status: 'unsafe',
		boundary: '4,000-6,000 km3 per year',
		value: 'Around 2,600 per year and rising',
		title: 'Freshwater use',
		body: 'Water is essential for life and is widely used by agriculture, industry and households. Excessive withdrawals of water, however, impair or even dry up lakes, rivers and aquifers, damaging ecosystems and altering the hydrological cycle.'
    },
    {
		image: land_use,
		status: 'exceeded',
		boundary: '75-54%',
		value: '62% and falling',
		title: 'Land use change',
		body: 'Converting land for human use – such as turning forests and wetlands into cities, farmland and highways – depletes Earth’s carbon sinks, destroys rich wildlife habitats, and undermines the land’s role in continually cycling water, nitrogen and phosphorus.'
    },
    {
		image: biodiversity,
		status: 'exceeded',
		boundary: '10-100',
		value: 'Around 100-1,000 and rising',
		title: 'Biodiversity loss',
		body: 'A decline in the number and variety of living species damages ecosystems and accelerates species extinction. As a result ecosystem resilience decreases, undermining the capacity to sustain human, animal and plant life.'
	},
];

export default () => (  
	<div className='registry-card-wrapper'>
	    <div className='card-content'>
			{cardsContent.slice(0, 4).map((card, index) => (
				<div key={`card-${index}`} className='card'>
					<h3 className='card-title'>{card?.title}</h3>
					<img src={card?.image} alt='' />
					<Popover commitment={card} />
					<p className='card-body'>{card?.body}</p>
				</div>
			))}
	    </div>
    </div>
);