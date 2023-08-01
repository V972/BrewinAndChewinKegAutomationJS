# Brewin' and Chewin' - Keg Automation w/ KubeJS

I like  Brewin' and Chewin' mod. I really do.    
However, the 1.18.2 version has a bug/flaw/incomplete feature set -- **you can't hopper items into the top slot**.    

And seeing how it won't receive a fix/patch/update AND sharing frustration about it with others,   
I basically went and said:  
![Fine, I'll do it myself](https://media.tenor.com/Euyv5NzBZFAAAAAC/thanos-infinity-gauntlet.gif)

And so, after remembering that KubeJS exists, tinkering w/ it for the past several days, as well as having to decompile the mods (special thanks to `@chiefarug` over at KubeJS Discord server) because no public repo :grimacing: 

### I present to you this script.

It adds custom left-click functionality, allowing to fill both the bugged/flawed/incomplete top slot as well as ingredient slots *intelligently*.

### Video demonstration:
<a href="http://www.youtube.com/watch?feature=player_embedded&v=BYp0qawXENQ" target="_blank">
 <img src="http://img.youtube.com/vi/BYp0qawXENQ/maxresdefault.jpg" alt="Watch the video" width="480" height="270" border="10" />
</a>    

.    
*"That's all fine and dandy,"* -- you may ask, -- *"what the hell do you mean by "intelligently"? What's intelligent about it?"*

Good question.
Here's the rundown of the logic:

When you left-click the Keg:  
* with something in hand  
* while **not** crouching and **not** in creative    

the script takes whatever you were holding and depending on the face you clicked on does one of 2 things:  
1. Inserts it into ingredient slots if clicking on the top of the keg;   
2. Inserts it into the top slot if clicking on the front or the back of the keg;   
  
When doing so, the script tries to insert as many items as it can into that slot, up to stack size of that item.  
E.g. If you were holding `16` Honey bottles, then `16` bottles will go into the slot.  
If you were holding `10` and the there were another `10` already in the slot, the script will only take `6`, leaving `4` in your hand.  

And ofc, the :v:Intelligent:v: inserting into ingredient slots is essentially a round-robin with preference for smallest count.  
i.e. each insertion will prioritise empty slots, then slots w/ same item and smaller count then w/ bigger count.  

e.g. If all 4 slots are empty, with 4 click you will sequentially fill all the slots, thus, completing the recipe!  
Good luck reliably achieving this with hoppers!  
 
Here's how the slots are cycled:    
![keg_slot_order](https://github.com/V972/BrewinAndChewinKegAutomationJS/assets/45125685/8d608b4d-b01c-40fd-8aa6-da92c7dcd6c3)  

If you're confused, perhaps a video demonstration will be more informative.  

### Video demonstration:
<a href="http://www.youtube.com/watch?feature=player_embedded&v=VFxyRoB2i0E" target="_blank">
 <img src="http://img.youtube.com/vi/VFxyRoB2i0E/maxresdefault.jpg" alt="Watch the video" width="480" height="270" border="10" />
</a>  

.  
And ofc, this wouldn't be **automation** if it didn't work w/ Create.  
Luckily it does!  
  
As deployers have attack mode and work perfectly with this script, this allows for full keg automation!  
  
*Theoretically, this will work will any other click simulators, provided they can Left-click with item(s) in "hand".*  

### Video demonstration (and example setup):
<a href="http://www.youtube.com/watch?feature=player_embedded&v=IAzqfa9Pwks" target="_blank">
 <img src="http://img.youtube.com/vi/IAzqfa9Pwks/maxresdefault.jpg" alt="Watch the video" width="480" height="270" border="10" />
</a>  

### Installation and Downloads.

For installation, simply toss it into `<MC folder>\kubejs\server_scripts`.   

In case you had a world open don't forget to run `/kubejs reload server_scripts` and then `/reload` to reload the server scripts.   

## Have fun automating!   

### P.S.   
Is it kinda janky?   
Yes, yes it is.   

Is it a crutch?    
Oh, absolutely.   

Does it do the job and lets you automate brewing at least somehow?   
Also yes. 
