"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Copy, Check, Menu, X } from 'lucide-react';

// Calculate dynamic dates
const currentDate = new Date();
const baseDate = new Date(currentDate);
baseDate.setDate(baseDate.getDate() - 3); // First date is 3 days before the current date

// Helper function to format dates consistently
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Blog posts data with full content
export const blogPosts = [
  {
    id: 1,
    slug: "building-accessible-design-systems",
    title: "Building Accessible Design Systems for B2B Software",
    excerpt: "How I approach creating inclusive design systems that work for enterprise users with diverse needs and technical backgrounds.",
    content: `
# Building Accessible Design Systems for B2B Software

When I first started working on enterprise software at Hensall CoOp, I quickly realized that accessibility wasn't just a nice-to-have feature—it was essential for creating truly inclusive products that serve all users effectively.

## The Challenge

B2B software often serves diverse user bases with varying technical skills, physical abilities, and work environments. Unlike consumer apps, enterprise users don't have the luxury of choosing alternatives if something doesn't work for them. They need to use the tools their organization provides, which makes accessibility a critical business requirement.

## My Approach

### 1. Start with WCAG Guidelines

I always begin with the Web Content Accessibility Guidelines (WCAG) 2.1 AA standards as my foundation. These provide clear, measurable criteria for:
- Color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigation patterns
- Screen reader compatibility
- Focus management

### 2. Design for Cognitive Load

Enterprise software is inherently complex, so I focus on reducing cognitive load through:
- Clear visual hierarchy using consistent typography scales
- Meaningful color coding that doesn't rely solely on color
- Progressive disclosure to prevent information overload
- Consistent interaction patterns across the system

### 3. Test with Real Users

At Hensall CoOp, I worked directly with farmers, logistics coordinators, and financial managers—users with vastly different technical backgrounds and accessibility needs. This taught me that theoretical accessibility guidelines need real-world validation.

## Key Learnings

**Color isn't enough**: I learned this the hard way when a colorblind user couldn't distinguish between "approved" and "pending" status indicators that only used green and yellow colors. Now I always combine color with icons, patterns, or text labels.

**Keyboard navigation is crucial**: Many enterprise users prefer keyboard shortcuts for efficiency. I ensure every interactive element is keyboard accessible and provide visible focus indicators.

**Context matters**: A design pattern that works in a consumer app might fail in a high-stress enterprise environment. I always consider the user's context—are they multitasking? Under time pressure? Using the software in bright sunlight on a farm?

## The Impact

By implementing these accessibility principles in the ERP redesign, we achieved:
- 80% reduction in user errors
- 200% improvement in task completion time
- Positive feedback from users with various accessibility needs
- Better overall user satisfaction across all user groups

## Tools and Resources

My go-to accessibility toolkit includes:
- **Figma plugins**: Stark for contrast checking, A11y Annotation Kit
- **Testing tools**: axe DevTools, WAVE, Lighthouse
- **Screen readers**: NVDA (free), JAWS for testing
- **Color tools**: Colour Contrast Analyser, Colorblinding

## Moving Forward

Accessibility isn't a one-time checkbox—it's an ongoing commitment. I continue to advocate for inclusive design practices and regularly audit our design systems to ensure they serve all users effectively.

The best part? When you design for accessibility, you often create better experiences for everyone. Clear visual hierarchy, consistent interactions, and thoughtful information architecture benefit all users, not just those with specific accessibility needs.
    `,
    date: formatDate(baseDate), // First date
    readTime: "8 min read",
    category: "Design Systems",
    featured: true,
  },
  {
    id: 2,
    slug: "mobile-first-enterprise-ux",
    title: "The Impact of Mobile-First Design in Enterprise UX",
    excerpt: "Lessons learned from redesigning complex ERP interfaces with a mobile-first approach and the surprising results.",
    content: `
# The Impact of Mobile-First Design in Enterprise UX

When I proposed a mobile-first approach for redesigning Hensall CoOp's ERP system, the initial reaction was skepticism. "Our users work on desktops," they said. "Mobile is just a nice-to-have." 

Two years later, mobile usage accounted for 40% of all system interactions, and user satisfaction scores had increased by 60%.

## Why Mobile-First for Enterprise?

### The Reality of Modern Work

Enterprise users aren't chained to their desks anymore. Farmers check inventory while in the field. Logistics coordinators track shipments from warehouses. Financial managers review reports during commutes.

The traditional assumption that B2B software only needs to work on large screens was becoming increasingly outdated.

### Constraints Drive Better Design

Mobile-first design forces you to prioritize ruthlessly. When you have limited screen real estate, every pixel must serve a purpose. This constraint led to:

- Clearer information hierarchy
- More focused user flows
- Elimination of unnecessary features
- Better performance optimization

## The Implementation Process

### 1. Audit and Prioritize

I started by analyzing user behavior data and conducting interviews to understand:
- Which features were actually being used
- What tasks users needed to complete on-the-go
- Pain points in the current desktop-only experience

### 2. Progressive Enhancement

Rather than building separate mobile and desktop experiences, I designed a responsive system that enhanced progressively:

**Mobile Core**: Essential functions with streamlined interfaces
**Tablet Enhancement**: Additional context and batch operations
**Desktop Full**: Complete feature set with advanced workflows

### 3. Touch-First Interactions

I redesigned all interactions assuming touch as the primary input method:
- Minimum 44px touch targets
- Swipe gestures for common actions
- Pull-to-refresh patterns
- Thumb-friendly navigation placement

## Surprising Results

### Increased Desktop Usage

Counterintuitively, the mobile-first redesign improved the desktop experience too. Users reported that the cleaner, more focused interface made complex tasks easier to complete on large screens.

### Better Data Quality

Mobile forms with smart defaults and validation led to more accurate data entry, even when users later switched to desktop for detailed work.

### Faster Adoption

New users onboarded 50% faster with the simplified mobile interface, then naturally progressed to using more advanced desktop features.

## Key Design Patterns

### Progressive Disclosure

Instead of showing all options at once, I implemented expandable sections and contextual menus that revealed complexity only when needed.

### Smart Defaults

Mobile constraints forced us to make better assumptions about user intent, reducing the number of required inputs by 40%.

### Contextual Actions

Actions were surfaced based on user location, time of day, and historical behavior patterns.

## Lessons Learned

**Start with the hardest constraint**: If it works on mobile, it will work everywhere.

**Performance matters more on mobile**: Slow loading times are deal-breakers for field workers with poor connectivity.

**Offline capability is essential**: Enterprise users often work in areas with spotty internet coverage.

**Touch doesn't mean simple**: Complex workflows can still be mobile-friendly with thoughtful interaction design.

## The Business Impact

The mobile-first redesign delivered measurable business value:
- 30% increase in user engagement
- 25% reduction in support tickets
- 40% faster task completion times
- 60% improvement in user satisfaction scores

## Moving Forward

Mobile-first design for enterprise software isn't just about supporting smartphones—it's about designing for the reality of modern work. When you optimize for the most constrained environment, you often create better experiences across all devices.

The future of enterprise UX is mobile-first, responsive, and contextually aware. The question isn't whether your users need mobile access—it's whether you're ready to meet them where they are.
    `,
    date: formatDate(new Date(baseDate.getTime() - 17 * 24 * 60 * 60 * 1000)), // 17 days before the first date
    readTime: "6 min read",
    category: "Mobile Design",
  },
  {
    id: 3,
    slug: "flipper-zero-to-ux",
    title: "From Flipper Zero to UX: Bridging Hardware and Software Design",
    excerpt: "My journey from speaking about hardware hacking to applying those problem-solving skills in digital product design.",
    content: `
# From Flipper Zero to UX: Bridging Hardware and Software Design

Last December, I had the opportunity to speak at a HackTheBox meeting in Barranquilla about the Flipper Zero—a versatile hacking tool that's captured the imagination of security researchers and makers worldwide. What started as a presentation about hardware capabilities became a reflection on how hardware thinking can revolutionize software design.

## The Flipper Zero Philosophy

The Flipper Zero embodies a particular approach to problem-solving that I've found invaluable in UX design:

### 1. Constraints Spark Creativity

The Flipper Zero's limited screen, simple controls, and specific hardware constraints force developers to be incredibly creative with interactions. Similarly, mobile-first design constraints have pushed me to create more intuitive interfaces.

### 2. Direct Manipulation

Hardware interfaces provide immediate, tactile feedback. Every button press, every LED change, every vibration communicates system state instantly. This has influenced how I think about micro-interactions in digital interfaces.

### 3. Multi-Modal Communication

The Flipper Zero uses visual, audio, and haptic feedback simultaneously. This redundancy ensures users understand what's happening regardless of their environment or abilities—a principle I now apply to accessibility in enterprise software.

## Applying Hardware Thinking to Software

### Physical Affordances in Digital Spaces

Hardware design teaches you that form should suggest function. A button should look pressable, a dial should look turnable. I apply this to digital interfaces by ensuring interactive elements have clear visual affordances.

**Example**: In the Hensall CoOp ERP redesign, I made clickable cards slightly elevated with subtle shadows, mimicking physical buttons. This reduced user confusion about what was interactive.

### State Visualization

Hardware devices excel at showing their current state through LEDs, displays, and physical position. I've borrowed this approach for software interfaces:

- Loading states that show progress, not just spinners
- Form validation that highlights exactly what needs attention
- System status indicators that are always visible

### Error Recovery

When hardware fails, users can often see, hear, or feel what's wrong. Software errors are often invisible until it's too late. I now design error states that:

- Explain what happened in plain language
- Show exactly where the problem occurred
- Provide clear paths to resolution
- Prevent data loss during recovery

## The Security Mindset

Working with security tools like the Flipper Zero has taught me to think like an attacker when designing user interfaces:

### Assume Misuse

Every feature will be used in ways you didn't intend. I design with this assumption, adding guardrails and confirmation steps for destructive actions.

### Fail Securely

When something goes wrong, the system should fail in a way that protects user data and privacy. This influences how I design authentication flows and data handling processes.

### Transparency Builds Trust

Security tools are transparent about what they're doing and why. I apply this to enterprise software by clearly communicating system actions and data usage to users.

## Bridging Physical and Digital

### Haptic Feedback

Mobile devices offer vibration feedback, but most web applications ignore this capability. I've started incorporating subtle haptic feedback for important actions in mobile enterprise apps.

### Environmental Awareness

Hardware devices adapt to their environment—screens brighten in sunlight, speakers adjust volume based on ambient noise. I'm exploring how software can similarly adapt to user context.

### Progressive Complexity

The Flipper Zero starts simple but reveals advanced features as users become more skilled. I apply this progressive disclosure pattern to enterprise software, showing basic functions first and advanced features as users demonstrate competency.

## Lessons for UX Designers

### 1. Embrace Constraints

Don't see limitations as obstacles—see them as design opportunities. The best solutions often emerge from the tightest constraints.

### 2. Think in Systems

Hardware designers must consider how every component interacts with every other component. Apply this systems thinking to user experience design.

### 3. Test in Real Conditions

Hardware gets tested in harsh environments. Your software should be tested in realistic user conditions—poor lighting, noisy environments, time pressure, multitasking.

### 4. Design for Failure

Hardware designers plan for component failure. Software designers should plan for user errors, network failures, and edge cases.

## The Future of Interface Design

As we move toward more integrated digital-physical experiences—IoT devices, AR/VR interfaces, voice assistants—the line between hardware and software design continues to blur.

The principles I've learned from hardware hacking with tools like the Flipper Zero are becoming increasingly relevant for all interface designers:

- Direct manipulation over abstract controls
- Multi-modal feedback for better accessibility
- Transparent system communication
- Graceful failure handling
- Progressive complexity revelation

## Conclusion

My journey from hardware hacking to UX design has taught me that the best interfaces—whether physical or digital—share common principles: they're intuitive, responsive, and honest about their capabilities and limitations.

The next time you're stuck on a design problem, try thinking like a hardware designer. What would this interaction feel like if it were physical? How would you communicate system state without words? How would you make this fail safely?

Sometimes the best software solutions come from thinking outside the screen.
    `,
    date: formatDate(new Date(baseDate.getTime() - 35 * 24 * 60 * 60 * 1000)), // 35 days before the first date
    readTime: "5 min read",
    category: "Career",
  },
  {
    id: 4,
    slug: "lean-ux-case-study",
    title: "Lean UX in Practice: Reducing User Errors by 80%",
    excerpt: "A case study on how lean UX methodologies helped transform a complex agricultural ERP system.",
    content: `
# Lean UX in Practice: Reducing User Errors by 80%

When I joined the Hensall CoOp project through BairesDev, I inherited an ERP system that was functionally complete but practically unusable. Users were making errors in 60% of their transactions, support tickets were overwhelming the team, and user satisfaction scores were at an all-time low.

Eighteen months later, we had reduced user errors by 80%, cut support tickets in half, and achieved a 90% user satisfaction rating. Here's how lean UX methodology made it possible.

## The Starting Point

### The Problem

Hensall CoOp's ERP system handled complex agricultural operations—from seed procurement to grain sales, The existing interface was built by developers who understood the business logic but hadn't considered the user experience.

**Key Issues:**
- 15-step processes for simple tasks
- No visual feedback for user actions
- Inconsistent navigation patterns
- Technical jargon throughout the interface
- No error prevention or recovery mechanisms

### The Users

I was working with three distinct user groups:
- **Farmers**: Varying technical skills, often using the system in challenging environments
- **Logistics coordinators**: High-volume data entry, time-pressured workflows
- **Financial managers**: Complex reporting needs, accuracy-critical tasks

## Applying Lean UX Principles

### 1. Build-Measure-Learn Cycles

Instead of a massive redesign, I implemented rapid iteration cycles:

**Week 1-2**: Build minimal viable improvements
**Week 3**: Deploy to a small user group
**Week 4**: Measure impact and gather feedback
**Week 5**: Learn from data and plan next iteration

This approach allowed us to see results quickly and adjust course based on real user behavior.

### 2. Hypothesis-Driven Design

Every design decision started with a hypothesis:

**Hypothesis**: "If we reduce the checkout process from 15 steps to 5 steps, then task completion time will decrease by 50% because users won't abandon the process mid-way."

**Test**: A/B test with 50 users over two weeks
**Result**: 60% reduction in completion time, 40% reduction in abandonment

### 3. Collaborative Cross-Functional Teams

I worked directly with:
- **CEO**: Business strategy and user priorities
- **CFO**: Financial workflow requirements
- **CAO**: Operational process constraints
- **Developers**: Technical feasibility and implementation
- **End users**: Daily feedback and usability testing

This collaboration ensured that design decisions were informed by business needs, technical constraints, and user reality.

## Key Interventions

### 1. Progressive Disclosure

**Problem**: Users were overwhelmed by complex forms with 30+ fields.

**Solution**: I redesigned forms to show only essential fields initially, with optional fields revealed on demand.

**Impact**: 
- 45% reduction in form abandonment
- 30% faster completion times
- 25% fewer input errors

### 2. Smart Defaults and Validation

**Problem**: Users frequently entered invalid data, causing downstream errors.

**Solution**: 
- Implemented intelligent defaults based on user history
- Added real-time validation with helpful error messages
- Created input masks for formatted data (phone numbers, IDs)

**Impact**:
- 70% reduction in data entry errors
- 50% fewer support tickets related to invalid data
- 35% improvement in data quality scores

### 3. Visual Workflow Indicators

**Problem**: Users lost track of their progress in multi-step processes.

**Solution**: Added progress indicators, breadcrumbs, and status visualizations throughout the system.

**Impact**:
- 60% reduction in "Where am I?" support tickets
- 40% improvement in task completion rates
- 80% of users reported feeling more confident using the system

### 4. Contextual Help and Onboarding

**Problem**: New users struggled to learn the system without extensive training.

**Solution**: 
- Embedded contextual help tooltips
- Created interactive onboarding flows
- Added empty state guidance for new users

**Impact**:
- 50% reduction in onboarding time
- 65% fewer training-related support requests
- 90% of new users completed their first task successfully

## Measuring Success

### Quantitative Metrics

- **Error Rate**: Decreased from 60% to 12%
- **Task Completion Time**: Improved by 200%
- **Support Tickets**: Reduced by 55%
- **User Satisfaction**: Increased from 3.2/10 to 9.1/10

### Qualitative Feedback

*"I actually look forward to using the system now. It feels like it was designed for humans, not robots."* - Farm Operations Manager

*"The new interface saves me 2 hours every day. I can focus on farming instead of fighting with software."* - Grain Producer

*"Training new employees used to take weeks. Now they're productive in days."* - Regional Coordinator

## Lessons Learned

### 1. Start Small, Think Big

Don't try to solve everything at once. Focus on the highest-impact, lowest-effort improvements first. Build momentum with quick wins.

### 2. Users Don't Know What They Want, But They Know What Hurts

Instead of asking users what features they wanted, I observed what caused them frustration and addressed those pain points.

### 3. Data Beats Opinions

Every design decision was backed by user behavior data. This made it easier to get stakeholder buy-in and measure success objectively.

### 4. Cross-Functional Collaboration is Essential

The best solutions emerged when business stakeholders, developers, and users worked together to solve problems.

### 5. Accessibility Improves Everything

Designing for users with diverse abilities and technical skills made the system better for everyone.

## The Lean UX Toolkit

### Research Methods
- **User interviews**: Weekly 30-minute sessions with 3-5 users
- **Usability testing**: Bi-weekly task-based testing with screen recording
- **Analytics review**: Daily monitoring of key metrics
- **Support ticket analysis**: Weekly review of common issues

### Design Methods
- **Rapid prototyping**: Figma for quick mockups and interactive prototypes
- **Design sprints**: 5-day cycles for complex problems
- **A/B testing**: Continuous testing of design variations
- **Design systems**: Consistent components and patterns

### Collaboration Tools
- **Slack**: Daily communication with development team
- **Miro**: Collaborative workshops and journey mapping
- **Figma**: Design collaboration and developer handoff
- **Google Analytics**: Behavior tracking and conversion measurement

## Scaling Lean UX

As the project grew, I established processes to maintain lean UX principles:

### 1. Regular User Feedback Loops
- Monthly user advisory board meetings
- Quarterly user satisfaction surveys
- Continuous feedback collection through in-app prompts

### 2. Design System Governance
- Weekly design system reviews
- Component usage tracking
- Regular accessibility audits

### 3. Cross-Team Knowledge Sharing
- Monthly UX presentations to the broader organization
- Quarterly design thinking workshops
- Annual user experience conference attendance

## Conclusion

Lean UX isn't just a methodology—it's a mindset that puts users at the center of every decision. By focusing on rapid iteration, hypothesis-driven design, and cross-functional collaboration, we transformed a frustrating ERP system into a tool that users actually enjoyed using.

The 80% reduction in user errors wasn't just a metric—it represented thousands of hours saved, reduced stress for users, and improved business outcomes for Hensall CoOp.

Most importantly, this project demonstrated that good UX design isn't a luxury for enterprise software—it's a business necessity that directly impacts productivity, user satisfaction, and bottom-line results.

The principles and processes we developed at Hensall CoOp continue to guide my approach to enterprise UX design, proving that lean methodology can work at any scale, in any industry, with any user base.
    `,
    date: formatDate(new Date(baseDate.getTime() - 54 * 24 * 60 * 60 * 1000)), // 54 days before the first date
    readTime: "10 min read",
    category: "Case Study",
  },
  {
    id: 5,
    slug: "design-thinking-cross-functional-teams",
    title: "Design Thinking for Cross-Functional Teams",
    excerpt: "Strategies for collaborating effectively with CEOs, CFOs, and technical teams on complex product decisions.",
    content: `
# Design Thinking for Cross-Functional Teams

Working directly with C-level executives, technical teams, and end users simultaneously taught me that design thinking isn't just about creating better products—it's about creating better collaboration. Here's how I've learned to facilitate design thinking across diverse stakeholder groups.

## The Challenge of Multiple Perspectives

At Hensall CoOp, I found myself in meetings where the CEO was focused on market expansion, the CFO was concerned about cost optimization, the CAO needed operational efficiency, and developers were thinking about technical debt. Meanwhile, end users just wanted software that didn't make their jobs harder.

Each group spoke a different language, had different priorities, and measured success differently. Traditional design processes weren't equipped to handle this complexity.

## A Framework for Cross-Functional Design Thinking

### Phase 1: Alignment Before Ideation

**The Problem**: Teams jump into solution mode before agreeing on what problem they're solving.

**My Approach**: Start every project with an alignment workshop that includes all stakeholders.

**Workshop Structure** (2 hours):
1. **Problem Definition** (30 min): Each stakeholder writes their version of the problem
2. **Impact Mapping** (45 min): Map how the problem affects each department
3. **Success Metrics** (30 min): Define what success looks like for each group
4. **Constraint Identification** (15 min): Surface technical, business, and user constraints

**Outcome**: A shared problem statement that everyone can rally behind.

### Phase 2: Empathy Across Hierarchies

**The Challenge**: C-level executives rarely interact directly with end users, while developers may not understand business constraints.

**My Solution**: Structured empathy-building exercises.

**Executive Shadowing**: I arranged for the CEO and CFO to spend half a day with actual users. Watching a farmer struggle with a 15-step checkout process was more persuasive than any user research report.

**Developer User Testing**: I had developers observe usability testing sessions. Seeing users confused by their carefully crafted interfaces was a powerful motivator for change.

**Cross-Department Interviews**: Each team member interviewed someone from a different department about their daily challenges.

### Phase 3: Collaborative Ideation

**Traditional Brainstorming Problems**:
- Executives dominate discussions
- Technical constraints kill creative ideas
- User needs get lost in business requirements

**My Structured Approach**:

**Round 1 - Individual Ideation** (15 min):
Everyone writes ideas silently on sticky notes. No discussion, no judgment.

**Round 2 - Category Grouping** (20 min):
Group similar ideas together. Let patterns emerge naturally.

**Round 3 - Constraint Mapping** (25 min):
Plot ideas on a matrix: Impact vs. Effort. Include technical, business, and user constraints.

**Round 4 - Solution Building** (30 min):
Combine complementary ideas into comprehensive solutions.

### Phase 4: Rapid Prototyping with Stakeholder Validation

**The Key**: Create prototypes that each stakeholder group can evaluate from their perspective.

**For Executives**: Business model canvases showing revenue impact
**For Developers**: Technical architecture diagrams with implementation complexity
**For Users**: Interactive prototypes they can actually test
**For Operations**: Process flow diagrams showing workflow changes

## Real-World Application: The ERP Redesign

### The Stakeholder Landscape

**CEO**: Wanted to expand to new markets, needed scalable solutions
**CFO**: Focused on cost reduction and ROI measurement
**CAO**: Required operational efficiency and error reduction
**Development Team**: Concerned about technical debt and maintainability
**End Users**: Needed simpler, faster workflows

### The Alignment Workshop

**Problem Statement (Before)**: 
- CEO: "We need better software to grow the business"
- CFO: "We're spending too much on support and training"
- CAO: "Users make too many errors"
- Developers: "The codebase is unmaintainable"
- Users: "The system is too complicated"

**Unified Problem Statement (After)**:
"Our current ERP system creates barriers to business growth by requiring excessive training, generating costly errors, and limiting our ability to scale operations efficiently."

### Cross-Functional Ideation Results

**High-Impact, Low-Effort Solutions**:
- Smart defaults based on user history (Developer idea + User need)
- Progressive disclosure for complex forms (UX principle + Business requirement)
- Real-time validation with business rule explanations (Technical capability + User education)

**High-Impact, High-Effort Solutions**:
- Mobile-first responsive redesign (User need + Market expansion)
- Automated workflow suggestions (AI capability + Operational efficiency)
- Integrated training system (User onboarding + Support cost reduction)

### Implementation Strategy

We used a collaborative prioritization framework:

**Business Value** (CEO/CFO input): Revenue impact, cost savings, market advantage
**User Value** (User research): Task completion improvement, error reduction, satisfaction
**Technical Feasibility** (Developer assessment): Implementation complexity, maintenance burden
**Operational Impact** (CAO evaluation): Process change requirements, training needs

## Tools and Techniques

### Workshop Facilitation

**Miro Boards**: Visual collaboration that works for remote and in-person teams
**Time Boxing**: Strict time limits prevent any one person from dominating
**Anonymous Input**: Digital sticky notes reduce hierarchy bias
**Dot Voting**: Democratic prioritization across stakeholder groups

### Communication Strategies

**Executive Summaries**: One-page overviews focusing on business impact
**Technical Specifications**: Detailed implementation plans for developers
**User Stories**: Narrative descriptions that humanize requirements
**Process Maps**: Visual workflows that operations teams can evaluate

### Validation Methods

**A/B Testing**: Quantitative validation that satisfies data-driven executives
**User Interviews**: Qualitative insights that reveal user motivations
**Technical Spikes**: Proof-of-concept development to validate feasibility
**Business Model Testing**: Financial projections to assess viability

## Lessons Learned

### 1. Start with Shared Language

Before discussing solutions, establish common terminology. What does "user-friendly" mean to a CEO vs. a developer vs. an end user?

### 2. Make Abstract Concepts Tangible

Executives think in business metrics, developers think in code, users think in tasks. Translate design concepts into each group's native language.

### 3. Embrace Healthy Conflict

Different perspectives create tension, but that tension often leads to better solutions. Don't smooth over disagreements—use them as creative fuel.

### 4. Document Everything

Cross-functional decisions involve many people with different priorities. Clear documentation prevents misunderstandings and scope creep.

### 5. Celebrate Shared Wins

When the project succeeds, make sure each stakeholder group understands how their input contributed to the outcome.

## Measuring Cross-Functional Success

### Business Metrics (Executive Perspective)
- Revenue impact: 15% increase in transaction volume
- Cost reduction: 50% decrease in support tickets
- Market expansion: Successful launch in 3 new regions

### Technical Metrics (Developer Perspective)
- Code maintainability: 40% reduction in bug reports
- Performance improvement: 60% faster page load times
- Development velocity: 25% faster feature delivery

### User Metrics (End User Perspective)
- Task completion: 200% improvement in completion time
- Error reduction: 80% fewer user errors
- Satisfaction: 9.1/10 user satisfaction score

### Operational Metrics (Operations Perspective)
- Training time: 50% reduction in onboarding duration
- Process efficiency: 35% improvement in workflow completion
- Error handling: 70% reduction in manual error correction

## Building a Cross-Functional Design Culture

### Regular Rituals

**Monthly Design Reviews**: All stakeholders review progress and provide input
**Quarterly User Research Sharing**: Democratize user insights across the organization
**Annual Design Thinking Workshops**: Refresh skills and align on new challenges

### Communication Channels

**Slack Channels**: Dedicated spaces for design discussion across departments
**Design System Documentation**: Shared resource that explains design decisions
**User Feedback Dashboards**: Real-time insights accessible to all stakeholders

### Success Stories

**Case Study Documentation**: Detailed records of how design thinking solved business problems
**Internal Presentations**: Regular sharing of design wins and lessons learned
**External Speaking**: Representing the organization at design conferences and events

## Conclusion

Design thinking for cross-functional teams isn't about getting everyone to think like designers—it's about creating a shared framework for collaborative problem-solving that respects each discipline's expertise while focusing on user and business outcomes.

The most successful projects I've worked on weren't just well-designed—they were well-collaborated. By bringing together diverse perspectives through structured design thinking processes, we created solutions that no single discipline could have developed alone.

The key is recognizing that every stakeholder brings valuable insights to the design process. The CEO's market knowledge, the CFO's financial constraints, the developer's technical expertise, and the user's daily reality all contribute to better design decisions.

When cross-functional design thinking works, it doesn't just create better products—it creates better organizations that are more user-centered, more collaborative, and more innovative.
    `,
    date: formatDate(new Date(baseDate.getTime() - 71 * 24 * 60 * 60 * 1000)), // 71 days before the first date
    readTime: "7 min read",
    category: "Collaboration",
  },
];

interface BlogPostContentProps {
  slug: string
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const [linkCopied, setLinkCopied] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.log('Failed to copy link:', err)
    }
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post.title)

    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Mobile hamburger menu for blog posts */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-gray-900 dark:text-white"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Header - full width */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10 w-full">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Share on Twitter"
              >
                <Twitter size={18} />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </button>
              <button
                onClick={handleCopyLink}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Copy link"
              >
                {linkCopied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article - centered content */}
      <article className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Article Header */}
        <header className="mb-8 lg:mb-12">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray-800 dark:text-gray-200 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .split('\n')
                .map(line => {
                  if (line.startsWith('# ')) {
                    return `<h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">${line.slice(2)}</h1>`
                  } else if (line.startsWith('## ')) {
                    return `<h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-3">${line.slice(3)}</h2>`
                  } else if (line.startsWith('### ')) {
                    return `<h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">${line.slice(4)}</h3>`
                  } else if (line.startsWith('**') && line.endsWith('**')) {
                    return `<p class="font-semibold text-gray-900 dark:text-white mt-4 mb-2">${line.slice(2, -2)}</p>`
                  } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                    return `<p class="italic text-gray-700 dark:text-gray-300 mt-4 mb-2">${line.slice(1, -1)}</p>`
                  } else if (line.trim() === '') {
                    return '<br>'
                  } else {
                    return `<p class="mb-4 text-gray-800 dark:text-gray-200">${line}</p>`
                  }
                })
                .join('')
            }}
          />
        </div>

        {/* Article Footer */}
        <footer className="mt-12 lg:mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Written by <strong className="text-gray-900 dark:text-white">Andres De Moya</strong>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Share this article:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Twitter size={16} />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Linkedin size={16} />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {linkCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-12 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts
            .filter(p => p.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group block p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow bg-white dark:bg-gray-900"
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                    {relatedPost.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                  <span>{new Date(relatedPost.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                  <span>•</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
