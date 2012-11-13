// Carousel Pager for Bootstrap jQuery Plugin
// (c)2012 Selectabase Ltd
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// Copyright 2012 Selectabase Ltd
// http://www.selectabase.co.uk/
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Usage:
// 1) Import Script (after jQuery and Bootstrap)
// 2) Call $('.carousel').carouselPager();
// 3) Define css styles for .carousel-pager, .carousel-pager a and .carousel-pager a.active

jQuery.fn.carouselPager = function()
{
	// Calculate the number of items in the carousel to page
	var itemCount = this.find('.item').size();
	// make sure we have some items in the first place
	if (itemCount > 0)
	{
		// if we have a pager div, use that. Otherwise create one
		var pager = this.find('.carousel-pager')
		pager = typeof pager !== 'undefined' ? pager : this.append('<div class="carousel-pager"></div>').find('.carousel-pager');
		// add the first item, assume it's the active one ( for now )
		pager.append('<a class="active" href="#"></a> ');
		// and create the rest		
		for (i = 1; i < itemCount; i++)
			pager.append('<a href="#"></a> ');
		
		// set up the click handler to scroll to the specified index
		pager.find('a').click(
			function(e)
			{
				// get our index in the pager
				var index = $(this).index();
				// move the carousel to the selected index. We assume the 'carousel' class is used (Bootstrap)
				$(this).parents('.carousel').carousel(index);
				// prevent the default click action
				e.preventDefault();
			}
		);
		
		// handle the slid event to update the current pager item
		this.bind('slid', function() {
			// work out which item is currently active
			var index = $(this).find('.item.active').index();
			// remove the active class from the old active pager item
			$(this).find('.carousel-pager a.active').removeClass('active')
			// the just add it to the new active pager item
			$(this).find('.carousel-pager a').eq(index).addClass('active');
		});
	}
	// return ourselves to allow chaining
	return this;
};
