package com.x.ahtest.assemble.control.jaxrs;

import java.util.Set;

import javax.ws.rs.ApplicationPath;

import com.x.ahtest.assemble.control.jaxrs.sample.SampleEntityClassNameAction;
import com.x.base.core.project.jaxrs.AbstractActionApplication;

/**
 * Jaxrs服务注册类，在此类中注册的Action会向外提供服务
 * @author sword
 */
@ApplicationPath("jaxrs")
public class ActionApplication extends AbstractActionApplication {

	@Override
	public Set<Class<?>> getClasses() {

		//提供服务的Action类需要在这里注册，不然无法向外提供服务
		this.classes.add( SampleEntityClassNameAction.class);

		return this.classes;
	}

}
