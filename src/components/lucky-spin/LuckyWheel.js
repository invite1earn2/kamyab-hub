"use client";

export default function LuckyWheel({

rotation,

spinning,

onSpin,

rewards = []

}){

return(

<div className="mt-5 flex flex-col items-center">

<div className="relative">

<div className="absolute left-1/2 -top-8 -translate-x-1/2 text-5xl z-20">

📍

</div>

<svg

className="w-[280px] h-[280px] md:w-[420px] md:h-[420px]"

width="420"

height="420"

viewBox="0 0 420 420"

style={{

transform:`rotate(${rotation}deg)`,

transition:spinning

?

"transform 5s cubic-bezier(.17,.67,.19,1)"

:

"none"

}}

>

<defs>

<filter id="shadow">

<feDropShadow

dx="0"

dy="6"

stdDeviation="8"

floodOpacity="0.25"

/>

</filter>

<radialGradient id="goldGradient">

<stop offset="0%" stopColor="#FFF8A6"/>

<stop offset="45%" stopColor="#FACC15"/>

<stop offset="100%" stopColor="#D97706"/>

</radialGradient>

</defs>

<circle

cx="210"

cy="210"

r="200"

fill="#FFF8E1"

stroke="#F59E0B"

strokeWidth="12"

filter="url(#shadow)"

/>

{

rewards.map((reward,index)=>{

const start=index*45;

return(

<g

key={index}

transform={`rotate(${start} 210 210)`}

>

<path

d="M210 210 L210 15 A195 195 0 0 1 347 73 Z"

fill={reward.color}

stroke="#ffffff"

strokeWidth="2"

/>

<text

x="210"

y="82"

textAnchor="middle"

fontSize="13"

fontWeight="700"

fill="white"

>

{reward.icon} {reward.reward_name}

</text>

</g>

);

})

}

<g

onClick={!spinning ? onSpin : undefined}

style={{

cursor:spinning ? "default" : "pointer",

transformOrigin:"210px 210px"

}}

className={

spinning

?

""

:

"animate-pulse"

}

>

<circle

cx="210"

cy="210"

r="48"

fill="url(#goldGradient)"

stroke="#ffffff"

strokeWidth="8"

style={{

filter:

spinning

?

"brightness(1)"

:

"drop-shadow(0 0 12px gold)"

}}

/>

<text

x="210"

y="217"

textAnchor="middle"

fontSize="20"

fontWeight="900"

fill="#7C2D12"

>

{

spinning

?

"..."

:

"SPIN"

}

</text>

</g>

</svg>

</div>

<div className="mt-6 w-full max-w-sm">

  <div className="rounded-2xl bg-white shadow p-4">

    <h3 className="text-center text-sm font-bold text-gray-800">

      🎁 Rewards You Can Win

    </h3>

    <div className="mt-4 grid grid-cols-2 gap-3">

      {rewards.map((reward) => (

        <div
          key={reward.id}
          className="rounded-xl p-3 text-center text-white font-semibold"
          style={{
            background: reward.color
          }}
        >

          <div className="text-xl">

            {reward.icon}

          </div>

          <div className="mt-2 text-xs">

            {reward.reward_name}

          </div>

        </div>

      ))}

    </div>

    <hr className="my-5" />

    <h3 className="text-center text-sm font-bold text-gray-800">

      ⭐ How It Works

    </h3>

    <div className="mt-4 space-y-3 text-sm text-gray-600">

      <div>

        ① Spin once every day.

      </div>

      <div>

        ② Win exciting rewards instantly.

      </div>

      <div>

        ③ Invite a successful Business Partner to unlock more spins.

      </div>

    </div>

  </div>

</div>

</div>

);

}